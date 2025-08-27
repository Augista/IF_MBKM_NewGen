import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const token = (await cookies()).get("authToken")?.value
    const user = verifyToken(token ?? "")

    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    let query = `
      SELECT 
        m.id,
        m.nama,
        m.tipe_mbkm,
        m.status,
        u.nama AS dosen_monev_nama
      FROM mbkm m
      LEFT JOIN users u ON m.dosen_monev_id = u.id
    `
    const values: any[] = []

    if (user.role === "mahasiswa") {
      query += ` WHERE m.user_id = $1`
      values.push(user.id)
    } else if (user.role === "dosen") {
      query += ` WHERE m.dosen_monev_id = $1`
      values.push(user.id)
    }

    query += ` ORDER BY m.created_at DESC`

    const { rows: mbkmData } = await db.query(query, values)

    return NextResponse.json({ data: mbkmData })
  } catch (error) {
    console.error("❌ GET /mbkm error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = (await cookies()).get("authToken")?.value
    const user = verifyToken(token ?? "")

    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const {
      nama,
      nrp,
      angkatan,
      tipeMbkm,
      jenisKegiatan,
      tujuan,
      jurusanStudi,
      deskripsiAktivitas,
      tanggalMulai,
      tanggalSelesai,
      durasi,
      modelKegiatan,
      keterangan,
    } = await request.json()

    if (!nama || !nrp || !tipeMbkm || !tanggalMulai || !tanggalSelesai) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Pilih dosen monev secara acak (satu saja dulu untuk demo)
    const { rows: dosen } = await db.query(
      `SELECT id FROM users WHERE role = 'dosen' LIMIT 1`
    )
    const dosenId = dosen[0]?.id ?? null

    const insertQuery = `
      INSERT INTO mbkm (
        user_id, nama, nrp, angkatan, tipe_mbkm, jenis_kegiatan,
        tujuan, jurusan_studi, deskripsi_aktivitas, tanggal_mulai,
        tanggal_selesai, durasi, model_kegiatan, keterangan, dosen_monev_id
      )
      VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9, $10,
        $11, $12, $13, $14, $15
      )
      RETURNING *
    `
    const { rows } = await db.query(insertQuery, [
      user.id,
      nama,
      nrp,
      angkatan,
      tipeMbkm,
      jenisKegiatan,
      tujuan,
      jurusanStudi,
      deskripsiAktivitas,
      tanggalMulai,
      tanggalSelesai,
      durasi,
      modelKegiatan,
      keterangan,
      dosenId,
    ])

    return NextResponse.json({ data: rows[0] })
  } catch (error) {
    console.error("❌ POST /mbkm error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
