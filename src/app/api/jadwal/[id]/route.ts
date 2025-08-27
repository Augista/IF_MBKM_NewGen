import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = (await cookies()).get("authToken")?.value
    const user = token && verifyToken(token)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data, error } = await supabase
      .from("jadwal_monev")
      .select(`
        *,
        dosen_id:users (nama)
      `)
      .eq("id", params.id)
      .single()

    if (error?.code === "PGRST116") {
      return NextResponse.json({ error: "Jadwal not found" }, { status: 404 })
    } else if (error) {
      throw error
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Get jadwal by ID error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = (await cookies()).get("authToken")?.value
    const user = token && verifyToken(token)
    if (!user || user.role !== "dosen") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { tanggal, tempat, waktu } = await request.json()

    const { data, error } = await supabase
      .from("jadwal_monev")
      .update({
        tanggal,
        tempat,
        waktu,
        updated_at: new Date().toISOString()
      })
      .eq("id", params.id)
      .eq("dosen_id", user.id)
      .select("*")
      .single()

    if (error?.code === "PGRST116") {
      return NextResponse.json({ error: "Jadwal not found" }, { status: 404 })
    } else if (error) {
      throw error
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Update jadwal error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = (await cookies()).get("authToken")?.value
    const user = token && verifyToken(token)
    if (!user || user.role !== "dosen") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data, error } = await supabase
      .from("jadwal_monev")
      .delete()
      .eq("id", params.id)
      .eq("dosen_id", user.id)
      .select("id")
      .single()

    if (error?.code === "PGRST116") {
      return NextResponse.json({ error: "Jadwal not found" }, { status: 404 })
    } else if (error) {
      throw error
    }

    return NextResponse.json({ message: "Jadwal deleted successfully" })
  } catch (error) {
    console.error("Delete jadwal error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
