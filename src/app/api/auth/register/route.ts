import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db"; 
import { hashPassword, generateToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { nama, email, nrp, role, password } = await request.json();

    if (!nama || !email || !role || !password) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
    }

    const existingUser = await db.query(
      `SELECT id FROM users WHERE email = $1`,
      [email]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 409 });
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    const result = await db.query(
      `INSERT INTO users (nama, email, nrp, role, password_hash)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, nama, email, nrp, role`,
      [nama, email, nrp, role, passwordHash]
    );

    const user = result.rows[0];

    // Generate token
    const token = generateToken(user);

    // Set cookie
    const response = NextResponse.json({
      user,
      token,
    });

    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 hari
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan di server" }, { status: 500 });
  }
}
