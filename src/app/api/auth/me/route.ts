import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
import { db,} from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("authToken")?.value

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }
    
    const user = verifyToken(token)

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const result = await db.query(
  `SELECT id, nama, email, nrp, role FROM users WHERE id = $1`,
  [user.id]
)


    if (result.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const userData = result.rows[0]

    return NextResponse.json({
      user: {
        id: userData.id,
        nama: userData.nama,
        email: userData.email,
        nrp: userData.nrp,
        role: userData.role,
      },
    })
  } catch (error) {
    console.error("❌ GET /api/user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
