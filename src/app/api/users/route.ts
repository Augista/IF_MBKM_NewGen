import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { hashPassword } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const userRole = request.headers.get("x-user-role")

    if (userRole !== "management") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { rows } = await db.query(
      `SELECT id, nama, email, nrp, role, created_at
       FROM users 
       ORDER BY created_at DESC`
    )

    return NextResponse.json({ data: rows })
  } catch (error) {
    console.error("Get users error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userRole = request.headers.get("x-user-role")

    if (userRole !== "management") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { nama, email, nrp, role, password } = await request.json()

    // Check if user already exists
    const { rows: existingUsers } = await db.query(
      `SELECT id FROM users WHERE email = $1 OR nrp = $2`,
      [email, nrp]
    )

    if (existingUsers.length > 0) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    // Hash password (default jika kosong)
    const passwordHash = await hashPassword(password || "defaultpassword123")

    // Create user
    const { rows } = await db.query(
      `INSERT INTO users (nama, email, nrp, role, password_hash)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, nama, email, nrp, role, created_at`,
      [nama, email, nrp, role, passwordHash]
    )

    return NextResponse.json({ data: rows[0] })
  } catch (error) {
    console.error("Create user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
