// src/app/api/test-db/route.ts

import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const res = await db.query("SELECT NOW()")
    return NextResponse.json({ time: res.rows[0] })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
