import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = (await cookies()).get("authToken")?.value
    const user = verifyToken(token ?? "")

    if (!user || user.role !== "dosen") {
      return NextResponse.json({ error: "Unauthorized - Dosen only" }, { status: 403 })
    }

    const { id } = params
    const { status } = await request.json()

    if (!["disetujui", "ditolak", "menunggu"].includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 })
    }

    const { rows: mbkmCheck } = await db.query(
      `SELECT id FROM mbkm WHERE id = $1 AND dosen_monev_id = $2`,
      [id, user.id]
    )

    if (mbkmCheck.length === 0) {
      return NextResponse.json({ error: "Forbidden - Not your MBKM to review" }, { status: 403 })
    }

    await db.query(
      `UPDATE mbkm SET status = $1 WHERE id = $2`,
      [status, id]
    )

    return NextResponse.json({ message: `Status updated to '${status}'` })
  } catch (error) {
    console.error("❌ PUT /mbkm/[id] error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
