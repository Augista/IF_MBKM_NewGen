import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { hashPassword } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userRole = request.headers.get("x-user-role")

    if (userRole !== "management") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { rows } = await db.query(
      `SELECT id, nama, email, nrp, role, created_at
       FROM users 
       WHERE id = $1`,
      [params.id]
    )

    if (rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ data: rows[0] })
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

    let query: string
    let values: any[]

    if (password) {
      const passwordHash = await hashPassword(password)
      query = `
        UPDATE users 
        SET 
          nama = $1,
          email = $2,
          nrp = $3,
          role = $4,
          password_hash = $5,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $6
        RETURNING id, nama, email, nrp, role, created_at
      `
      values = [nama, email, nrp, role, passwordHash, params.id]
    } else {
      query = `
        UPDATE users 
        SET 
          nama = $1,
          email = $2,
          nrp = $3,
          role = $4,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $5
        RETURNING id, nama, email, nrp, role, created_at
      `
      values = [nama, email, nrp, role, params.id]
    }

    const { rows } = await db.query(query, values)

    if (rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ data: rows[0] })
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

    const { rows } = await db.query(
      `DELETE FROM users 
       WHERE id = $1
       RETURNING id`,
      [params.id]
    )

    if (rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "User deleted successfully" })
  } catch (error) {
    console.error("Delete user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
