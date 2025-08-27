import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = (await cookies()).get("authToken")?.value
    const user = verifyToken(token ?? "")

    if (!user || user.role !== "mahasiswa") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const mbkmId = params.id

    // Validasi apakah MBKM milik user ini
    const { rows: mbkmRows } = await db.query(
      `SELECT * FROM mbkm WHERE id = $1 AND user_id = $2`,
      [mbkmId, user.id]
    )

    if (mbkmRows.length === 0) {
      return NextResponse.json({ error: "MBKM tidak ditemukan atau tidak berhak" }, { status: 404 })
    }

    // Update status menjadi "menunggu"
    await db.query(
      `UPDATE mbkm SET status = 'menunggu' WHERE id = $1`,
      [mbkmId]
    )

    return NextResponse.json({ message: "MBKM berhasil diajukan ke pemonev" })
  } catch (error) {
    console.error("❌ POST /mbkm/[id]/ajukan error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
