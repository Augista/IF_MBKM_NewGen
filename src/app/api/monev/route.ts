import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")
    const userRole = request.headers.get("x-user-role")

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let query = `
      SELECT 
        m.*,
        mb.nama as mahasiswa_nama,
        mb.angkatan,
        mb.tipe_mbkm,
        u.nama as dosen_nama
      FROM monev m
      LEFT JOIN mbkm mb ON m.mbkm_id = mb.id
      LEFT JOIN users u ON m.dosen_id = u.id
    `
    const params: any[] = []

    if (userRole === "dosen") {
      query += ` WHERE m.dosen_id = $1 ORDER BY m.created_at DESC`
      params.push(userId)
    } else if (userRole === "mahasiswa") {
      query += ` WHERE mb.user_id = $1 ORDER BY m.created_at DESC`
      params.push(userId)
    } else {
      query += ` ORDER BY m.created_at DESC`
    }

    const { rows } = await db.query(query, params)

    return NextResponse.json({ data: rows })
  } catch (error) {
    console.error("Get monev error:", error)
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

    const { mbkmId, monevKe, status, catatan } = await request.json()

    const { rows } = await db.query(
      `INSERT INTO monev (mbkm_id, dosen_id, monev_ke, status, catatan)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [mbkmId, userId, monevKe, status, catatan]
    )

    return NextResponse.json({ data: rows[0] })
  } catch (error) {
    console.error("Create monev error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
