import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
import { db } from "@/lib/db"
import { cookies } from "next/headers"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const config = {
  api: {
    bodyParser: false,
  },
}

// ------------------------
// GET: Ambil daftar transkrip user
// ------------------------
export async function GET(request: NextRequest) {
  try {
    const token = (await cookies()).get("authToken")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized - No token" }, { status: 401 })
    }

    const user = verifyToken(token)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized - Invalid token" }, { status: 401 })
    }

    const result = await db.query(
      `SELECT id, file_url, TO_CHAR(tanggal_upload, 'DD/MM/YYYY') AS tanggal_upload
       FROM transkrip
       WHERE user_id = $1
       ORDER BY tanggal_upload DESC`,
      [user.id]
    )

    return NextResponse.json({ data: result.rows })
  } catch (error) {
    console.error("GET /api/transkrip error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// ------------------------
// POST: Upload PDF ke bucket & simpan URL ke DB
// ------------------------
export async function POST(request: NextRequest) {
  try {
    const token = (await cookies()).get("authToken")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized - No token" }, { status: 401 })
    }

    const user = verifyToken(token)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized - Invalid token" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "File tidak ditemukan atau tidak valid" }, { status: 400 })
    }

    const fileName = `transkrip/${user.id}-${Date.now()}.pdf`

    const { error: uploadError } = await supabase.storage
      .from("transkrip")
      .upload(fileName, file, {
        contentType: "application/pdf",
        upsert: false,
      })

    if (uploadError) {
      console.error("Upload error:", uploadError)
      return NextResponse.json({ error: "Gagal mengunggah file ke storage" }, { status: 500 })
    }

    const { data: publicUrlData } = supabase.storage.from("transkrip").getPublicUrl(fileName)
    const fileUrl = publicUrlData.publicUrl

    const result = await db.query(
      `INSERT INTO transkrip (user_id, file_url)
       VALUES ($1, $2)
       RETURNING id, file_url, TO_CHAR(tanggal_upload, 'DD/MM/YYYY') AS tanggal_upload`,
      [user.id, fileUrl]
    )

    return NextResponse.json({ data: result.rows[0] })
  } catch (err) {
    console.error("POST /api/transkrip error:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
