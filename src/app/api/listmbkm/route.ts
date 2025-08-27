import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
   
    const token = (await cookies()).get("authToken")?.value
    if (!token) return NextResponse.json({ error: "Unauthorized - No token" }, { status: 401 })

    const user = verifyToken(token)
    if (!user || user.role !== "dosen") {
      return NextResponse.json({ error: "Unauthorized - Invalid token or not dosen" }, { status: 401 })
    }

    const query = `
      SELECT 
        id,
        nama,
        nrp,
        substring(nrp from 5 for 2) AS angkatan,
        tipe_mbkm,
        status
      FROM mbkm
      WHERE dosen_monev_id = $1
      ORDER BY created_at DESC
    `
    const values = [user.id]
    const { rows } = await db.query(query, values)

    // Format angkatan jadi 20xx
    const data = rows.map((m: any) => ({
      ...m,
      angkatan: `20${m.angkatan}`
    }))

    return NextResponse.json({ data })
  } catch (error) {
    console.error("❌ GET /dosen/mahasiswa-bimbingan error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
