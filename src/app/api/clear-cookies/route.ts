import { NextResponse } from "next/server"

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Cookies cleared successfully",
    })

    // Clear all possible cookies
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    })

    // Also try to clear without httpOnly in case there are client-side cookies
    response.cookies.set("token", "", {
      maxAge: 0,
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Clear cookies error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}