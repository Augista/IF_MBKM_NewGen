import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { hashPassword } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userRole = request.headers.get("x-user-role")

    if (userRole !== "management") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const users = await sql`
      SELECT id, nama, email, nrp, role, created_at
      FROM users 
      WHERE id = ${params.id}
    `

    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ data: users[0] })
  } catch (error) {
    console.error("Get user by ID error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userRole = request.headers.get("x-user-role")

    if (userRole !== "management") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { nama, email, nrp, role, password } = await request.json()

    let updateQuery = sql`
      UPDATE users 
      SET 
        nama = ${nama},
        email = ${email},
        nrp = ${nrp},
        role = ${role},
        updated_at = CURRENT_TIMESTAMP
    `

    if (password) {
      const passwordHash = await hashPassword(password)
      updateQuery = sql`
        UPDATE users 
        SET 
          nama = ${nama},
          email = ${email},
          nrp = ${nrp},
          role = ${role},
          password_hash = ${passwordHash},
          updated_at = CURRENT_TIMESTAMP
      `
    }

    const users = await sql`
      ${updateQuery}
      WHERE id = ${params.id}
      RETURNING id, nama, email, nrp, role, created_at
    `

    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ data: users[0] })
  } catch (error) {
    console.error("Update user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userRole = request.headers.get("x-user-role")

    if (userRole !== "management") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const users = await sql`
      DELETE FROM users 
      WHERE id = ${params.id}
      RETURNING id
    `

    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "User deleted successfully" })
  } catch (error) {
    console.error("Delete user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
