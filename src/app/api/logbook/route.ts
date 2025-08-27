import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
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
    if (!token) return NextResponse.json({ error: "Unauthorized - No token" }, { status: 401 })

    const user = verifyToken(token)
    if (!user) return NextResponse.json({ error: "Unauthorized - Invalid token" }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const mbkmId = searchParams.get("mbkm_id")

    let query = `
      SELECT 
        l.*,
        m.nama AS mbkm_nama,
        CONCAT(l.tanggal_mulai, ' - ', l.tanggal_selesai) AS rentang_waktu
      FROM logbook l
      LEFT JOIN mbkm m ON l.mbkm_id = m.id
      WHERE l.user_id = $1
    `
    const values: any[] = [user.id]

    if (mbkmId) {
      query += " AND l.mbkm_id = $2"
      values.push(mbkmId)
    }

    query += " ORDER BY l.pekan ASC"

    const { rows: logbooks } = await db.query(query, values)

    return NextResponse.json({ data: logbooks })
  } catch (error) {
    console.error("❌ GET /logbook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
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
    const buktiFile = formData.get("buktiFile") as File

    // Upload file utama (CPMK)
    let fileUrl: string | null = null
    if (file && typeof file !== "string" && "arrayBuffer" in file) {
      const fileName = `logbook/${user.id}-${Date.now()}-cpmk.pdf`
      const { error: uploadError } = await supabase.storage
        .from("logbook")
        .upload(fileName, file, {
          contentType: "application/pdf",
          upsert: false,
        })

      if (uploadError) {
        console.error("Upload error:", uploadError)
        return NextResponse.json({ error: "Gagal mengunggah file ke storage" }, { status: 500 })
      }

      const { data: publicUrlData } = supabase.storage.from("logbook").getPublicUrl(fileName)
      fileUrl = publicUrlData?.publicUrl ?? null
    }

    // Upload bukti file
    let buktiFileUrl: string | null = null
    if (buktiFile && typeof buktiFile !== "string" && "arrayBuffer" in buktiFile) {
      const buktiFileName = `logbook/${user.id}-${Date.now()}-bukti.pdf`
      const { error: uploadError } = await supabase.storage
        .from("logbook")
        .upload(buktiFileName, buktiFile, {
          contentType: "application/pdf",
          upsert: false,
        })

      if (uploadError) {
        console.error("Upload error (bukti file):", uploadError)
        return NextResponse.json({ error: "Gagal mengunggah bukti file ke storage" }, { status: 500 })
      }

      const { data: publicUrlData } = supabase.storage.from("logbook").getPublicUrl(buktiFileName)
      buktiFileUrl = publicUrlData?.publicUrl ?? null
    }

    if (!fileUrl || !buktiFileUrl) {
      return NextResponse.json({ error: "File CPMK dan Bukti wajib diunggah" }, { status: 400 })
    }

    const mbkmId = formData.get("mbkmId") as string
    const pekan = formData.get("pekan") as string
    const tanggalMulai = formData.get("tanggalMulai") as string
    const tanggalSelesai = formData.get("tanggalSelesai") as string
    const durasi = formData.get("durasi") as string
    const kegiatan = formData.get("kegiatan") as string

    if (!mbkmId || !pekan || !tanggalMulai || !tanggalSelesai || !durasi || !kegiatan) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { rows: checkMbkm } = await db.query(
      `SELECT id FROM mbkm WHERE id = $1 AND user_id = $2`,
      [mbkmId, user.id]
    )
    if (!checkMbkm.length) {
      return NextResponse.json({ error: "MBKM not found or not owned by user" }, { status: 403 })
    }

    const insertQuery = `
      INSERT INTO logbook (
        user_id, mbkm_id, cpmk_file_url, pekan,
        tanggal_mulai, tanggal_selesai, durasi,
        kegiatan, bukti_file_url
      ) VALUES (
        $1, $2, $3, $4,
        $5, $6, $7,
        $8, $9
      )
      RETURNING *
    `
    const { rows: inserted } = await db.query(insertQuery, [
      user.id,
      mbkmId,
      fileUrl,
      pekan,
      tanggalMulai,
      tanggalSelesai,
      durasi,
      kegiatan,
      buktiFileUrl,
    ])

    return NextResponse.json({ data: inserted[0] })
  } catch (error) {
    console.error("❌ POST /logbook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

