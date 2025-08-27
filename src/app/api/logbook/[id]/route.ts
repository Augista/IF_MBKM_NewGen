import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { cookies } from "next/headers"

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  try {
    const token = (await cookies()).get("authToken")?.value
    const user = verifyToken(token ?? "")

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = context.params

    const { rows } = await db.query(
      `SELECT * FROM logbook WHERE id = $1 AND user_id = $2`,
      [id, user.id]
    )

    if (!rows.length) {
      return NextResponse.json({ error: "Logbook not found" }, { status: 404 })
    }

    return NextResponse.json({ data: rows[0] })
  } catch (error) {
    console.error("❌ GET /logbook/[id] error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  try {
    const token = (await cookies()).get("authToken")?.value
    const user = verifyToken(token ?? "")

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = context.params

    const {
      cpmkFileUrl,
      pekan,
      tanggalMulai,
      tanggalSelesai,
      durasi,
      kegiatan,
      buktiFileUrl,
    } = await request.json()

    const { rowCount } = await db.query(
      `UPDATE logbook
       SET
         cpmk_file_url = $1,
         pekan = $2,
         tanggal_mulai = $3,
         tanggal_selesai = $4,
         durasi = $5,
         kegiatan = $6,
         bukti_file_url = $7
       WHERE id = $8 AND user_id = $9`,
      [
        cpmkFileUrl,
        pekan,
        tanggalMulai,
        tanggalSelesai,
        durasi,
        kegiatan,
        buktiFileUrl,
        id,
        user.id,
      ]
    )

    if (rowCount === 0) {
      return NextResponse.json({ error: "Logbook not found or not authorized" }, { status: 404 })
    }

    return NextResponse.json({ message: "Logbook updated successfully" })
  } catch (error) {
    console.error("❌ PUT /logbook/[id] error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  try {
    const token = (await cookies()).get("authToken")?.value
    const user = verifyToken(token ?? "")

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = context.params

    const { rowCount } = await db.query(
      `DELETE FROM logbook WHERE id = $1 AND user_id = $2`,
      [id, user.id]
    )

    if (rowCount === 0) {
      return NextResponse.json({ error: "Logbook not found or not authorized" }, { status: 404 })
    }

    return NextResponse.json({ message: "Logbook deleted successfully" })
  } catch (error) {
    console.error("❌ DELETE /logbook/[id] error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
