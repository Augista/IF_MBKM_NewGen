import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")
    const userRole = request.headers.get("x-user-role")

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let ekivalensi
    try {
      if (db) {
        if (userRole === "mahasiswa") {
          ekivalensi = await db.sql`
            SELECT 
              e.*,
              m.nama as mbkm_nama
            FROM ekivalensi e
            LEFT JOIN mbkm m ON e.mbkm_id = m.id
            WHERE m.user_id = ${userId}
            ORDER BY e.created_at DESC
          `
        } else {
          ekivalensi = await db.sql`
            SELECT 
              e.*,
              m.nama as mbkm_nama,
              u.nama as mahasiswa_nama
            FROM ekivalensi e
            LEFT JOIN mbkm m ON e.mbkm_id = m.id
            LEFT JOIN users u ON m.user_id = u.id
            ORDER BY e.created_at DESC
          `
        }
      } else {
        ekivalensi = []
      }
    } catch (dbError) {
      console.log("Database error, using fallback data")
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

    let ekivalensi
    try {
      if (db) {
        ekivalensi = await db.sql`
          INSERT INTO ekivalensi (
            mbkm_id, kode, mata_kuliah, semester, tahun_akademik,
            prodi_penyelenggara, sks, kelas, departemen, tipe,
            persentase, nilai_huruf, nilai_angka, catatan
          )
          VALUES (
            ${mbkmId}, ${kode}, ${mataKuliah}, ${semester}, ${tahunAkademik},
            ${prodiPenyelenggara}, ${sks}, ${kelas}, ${departemen}, ${tipe},
            ${persentase}, ${nilaiHuruf}, ${nilaiAngka}, ${catatan}
          )
          RETURNING *
        `
        ekivalensi = ekivalensi[0]
      } else {
        ekivalensi = {
          id: Date.now().toString(),
          mbkm_id: mbkmId,  
          kode,
          mata_kuliah: mataKuliah,
          semester,
          tahun_akademik: tahunAkademik,
          prodi_penyelenggara: prodiPenyelenggara,
          sks,
          kelas,
          departemen,
          tipe,
          persentase,
          nilai_huruf: nilaiHuruf,
          nilai_angka: nilaiAngka,
          catatan,
        }
      }
    } catch (dbError) {
      console.error("Database insert error:", dbError)
      return NextResponse.json({ error: "Failed to save ekivalensi" }, { status: 500 })
    }

    return NextResponse.json({ data: ekivalensi })
  } catch (error) {
    console.error("Create ekivalensi error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
