// middleware.ts
import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value
  console.log("authtoken:",token)

  if (!token || !verifyToken(token)) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/protected/:path*"],
}
