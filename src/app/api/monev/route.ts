import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")
    const userRole = request.headers.get("x-user-role")

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let monevData

    if (userRole === "dosen") {
      monevData = await sql`
        SELECT 
          m.*,
          mb.nama as mahasiswa_nama,
          mb.angkatan,
          mb.tipe_mbkm,
          u.nama as dosen_nama
        FROM monev m
        LEFT JOIN mbkm mb ON m.mbkm_id = mb.id
        LEFT JOIN users u ON m.dosen_id = u.id
        WHERE m.dosen_id = ${userId}
        ORDER BY m.created_at DESC
      `
    } else if (userRole === "mahasiswa") {
      monevData = await sql`
        SELECT 
          m.*,
          mb.nama as mahasiswa_nama,
          mb.angkatan,
          mb.tipe_mbkm,
          u.nama as dosen_nama
        FROM monev m
        LEFT JOIN mbkm mb ON m.mbkm_id = mb.id
        LEFT JOIN users u ON m.dosen_id = u.id
        WHERE mb.user_id = ${userId}
        ORDER BY m.created_at DESC
      `
    } else {
      monevData = await sql`
        SELECT 
          m.*,
          mb.nama as mahasiswa_nama,
          mb.angkatan,
          mb.tipe_mbkm,
          u.nama as dosen_nama
        FROM monev m
        LEFT JOIN mbkm mb ON m.mbkm_id = mb.id
        LEFT JOIN users u ON m.dosen_id = u.id
        ORDER BY m.created_at DESC
      `
    }

    return NextResponse.json({ data: monevData })
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

    const monev = await sql`
      INSERT INTO monev (mbkm_id, dosen_id, monev_ke, status, catatan)
      VALUES (${mbkmId}, ${userId}, ${monevKe}, ${status}, ${catatan})
      RETURNING *
    `

    return NextResponse.json({ data: monev[0] })
  } catch (error) {
    console.error("Create monev error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
