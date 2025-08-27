import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { generateToken } from "@/lib/auth"
import { db } from "@/lib/db"
import { cookies } from "next/headers"
import { User } from "@/types/user"

export const runtime = "nodejs"


export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }
    console.log("Connecting to DB with email:", email)
    const result = await db.query(
  `SELECT id, nama, email, nrp, role, password_hash FROM users WHERE email = $1`,
  [email]
)


    const user = result.rows[0]
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // const passwordMatch = await bcrypt.compare(password, user.password_hash)
    // if (!passwordMatch) {
    //   return NextResponse.json({ error: "Incorrect password" }, { status: 401 })
    // }

    const token = generateToken({
      id: user.id,
      nama: user.nama,
      email: user.email,
      nrp: user.nrp,
      role: user.role,
    });

    (await cookies()).set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60, 
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        nrp: user.nrp,
        role: user.role,
      },
    })
  } catch (err) {
    console.error("Login error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
