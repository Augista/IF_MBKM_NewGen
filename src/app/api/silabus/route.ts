import { type NextRequest, NextResponse } from "next/server"
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
      `SELECT file_url, link_url, TO_CHAR(tanggal_upload, 'DD/MM/YYYY') AS tanggal_upload
       FROM silabus
       WHERE user_id = $1
       ORDER BY tanggal_upload DESC`,
      [user.id]
    )

    const row = result.rows[0]
    if (!row) {
      return NextResponse.json({ error: "Silabus tidak ditemukan" }, { status: 404 })
    }

     return NextResponse.json({ data: result.rows });
  } catch (err) {
    console.error("GET /api/silabus error:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = (await cookies()).get("authToken")?.value
    if (!token) return NextResponse.json({ error: "Unauthorized - No token" }, { status: 401 })

    const user = verifyToken(token)
    if (!user) return NextResponse.json({ error: "Unauthorized - Invalid token" }, { status: 401 })

    const formData = await request.formData()
    const file = formData.get("file") as File 
    const link = formData.get("link") as string | null

    let fileUrl: string | null = null

    if (file && typeof file !== "string" && "arrayBuffer" in file) {
      const fileName = `silabus/${user.id}-${Date.now()}.pdf`
      const { error: uploadError } = await supabase.storage
        .from("silabus")
        .upload(fileName, file, {
          contentType: "application/pdf",
          upsert: false,
        })

      if (uploadError) {
        console.error("Upload error:", uploadError)
        return NextResponse.json({ error: "Gagal mengunggah file ke storage" }, { status: 500 })
      }

      const { data: publicUrlData } = supabase.storage
        .from("silabus")
        .getPublicUrl(fileName)

      if (!publicUrlData?.publicUrl) {
        return NextResponse.json({ error: "Gagal mendapatkan URL file" }, { status: 500 })
      }

      fileUrl = publicUrlData.publicUrl
    }

    if (!fileUrl && !link) {
      return NextResponse.json({ error: "Harus menyertakan file atau link" }, { status: 400 })
    }

    const result = await db.query(
      `INSERT INTO silabus (user_id, file_url, link_url)
       VALUES ($1, $2, $3)
       RETURNING id, file_url, link_url, TO_CHAR(tanggal_upload, 'YYYY-MM-DD') AS tanggal_upload`,
      [user.id, fileUrl, link]
    )

    return NextResponse.json({ data: result.rows[0] })
  } catch (error) {
    console.error("POST /api/silabus error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
