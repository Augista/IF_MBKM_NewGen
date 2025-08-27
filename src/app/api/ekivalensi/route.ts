import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")
    const userRole = request.headers.get("x-user-role")

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let ekivalensi: any[] = []

    try {
      if (userRole === "mahasiswa") {
        const { rows } = await db.query(
          `SELECT 
             e.*,
             m.nama as mbkm_nama
           FROM ekivalensi e
           LEFT JOIN mbkm m ON e.mbkm_id = m.id
           WHERE m.user_id = $1
           ORDER BY e.created_at DESC`,
          [userId]
        )
        ekivalensi = rows
      } else {
        const { rows } = await db.query(
          `SELECT 
             e.*,
             m.nama as mbkm_nama,
             u.nama as mahasiswa_nama
           FROM ekivalensi e
           LEFT JOIN mbkm m ON e.mbkm_id = m.id
           LEFT JOIN users u ON m.user_id = u.id
           ORDER BY e.created_at DESC`
        )
        ekivalensi = rows
      }
    } catch (dbError) {
      console.error("Database error:", dbError)
      ekivalensi = []
    }

    return NextResponse.json({ data: ekivalensi })
  } catch (error) {
    console.error("Get ekivalensi error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")
    const userRole = request.headers.get("x-user-role")

    if (!userId || userRole !== "dosen") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const {
      mbkmId,
      kode,
      mataKuliah,
      semester,
      tahunAkademik,
      prodiPenyelenggara,
      sks,
      kelas,
      departemen,
      tipe,
      persentase,
      nilaiHuruf,
      nilaiAngka,
      catatan,
    } = await request.json()

    try {
      const { rows } = await db.query(
        `INSERT INTO ekivalensi (
          mbkm_id, kode, mata_kuliah, semester, tahun_akademik,
          prodi_penyelenggara, sks, kelas, departemen, tipe,
          persentase, nilai_huruf, nilai_angka, catatan
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
        RETURNING *`,
        [
          mbkmId,
          kode,
          mataKuliah,
          semester,
          tahunAkademik,
          prodiPenyelenggara,
          sks,
          kelas,
          departemen,
          tipe,
          persentase,
          nilaiHuruf,
          nilaiAngka,
          catatan,
        ]
      )

      return NextResponse.json({ data: rows[0] })
    } catch (dbError) {
      console.error("Database insert error:", dbError)
      return NextResponse.json({ error: "Failed to save ekivalensi" }, { status: 500 })
    }
  } catch (error) {
    console.error("Create ekivalensi error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
