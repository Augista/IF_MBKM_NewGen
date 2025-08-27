import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { hashPassword } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const userRole = request.headers.get("x-user-role")

    if (userRole !== "management") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const users = await sql`
      SELECT id, nama, email, nrp, role, created_at
      FROM users 
      ORDER BY created_at DESC
    `

    return NextResponse.json({ data: users })
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
    const existingUsers = await sql`
      SELECT id FROM users WHERE email = ${email} OR nrp = ${nrp}
    `

    if (existingUsers.length > 0) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    // Hash password
    const passwordHash = await hashPassword(password || "defaultpassword123")

    // Create user
    const users = await sql`
      INSERT INTO users (nama, email, nrp, role, password_hash)
      VALUES (${nama}, ${email}, ${nrp}, ${role}, ${passwordHash})
      RETURNING id, nama, email, nrp, role, created_at
    `

    return NextResponse.json({ data: users[0] })
  } catch (error) {
    console.error("Create user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
