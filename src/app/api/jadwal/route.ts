import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
import { cookies } from "next/headers"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

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

    let jadwalData

    if (user.role === "dosen") {
      const { data, error } = await supabase
          .from("jadwal_monev")
          .select(`
            *,
            dosen:users (
              nama
            )
          `)
          .eq("dosen_id", user.id)
          .order("tanggal", { ascending: true })
      if (error) throw error
      jadwalData = data
    } else if (user.role === "mahasiswa") {
      const { data, error } = await supabase
        .from("jadwal_monev")
       .select(`
        *,
        dosen_id:users(nama),
        booking_jadwal (
          waktu_dipilih,
          status,
          mahasiswa_id
        )
      `)
        .order("tanggal", { ascending: true })

      if (error) throw error

      // Filter agar mahasiswa hanya bisa melihat slot yang belum dibooking
      jadwalData = data.filter((j: any) => {
        const sudahDibooking = j.booking_jadwal?.some((b: any) => b.status === "booked")
        const sayaYangBooking = j.booking_jadwal?.some((b: any) => b.mahasiswa_id === user.id)
        return !sudahDibooking || sayaYangBooking
      })
    } else {
      // Role manajemen
      const { data, error } = await supabase
      .from("jadwal_monev")
      .select("*, dosen_id:users(nama)")
      .order("tanggal", { ascending: true })

      if (error) throw error
      jadwalData = data
    }

    return NextResponse.json({ data: jadwalData })
  } catch (error) {
    console.error("Get jadwal error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = (await cookies()).get("authToken")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized - No token" }, { status: 401 })
    }

    const user = verifyToken(token)
    if (!user || user.role !== "dosen") {
      return NextResponse.json({ error: "Unauthorized - Not a dosen" }, { status: 401 })
    }

    const { tanggal, tempat, waktu } = await request.json()

    const { data, error } = await supabase
      .from("jadwal_monev")
      .insert({
        dosen_id: user.id,
        tanggal,
        tempat,
        waktu
      })
      .select("*")
      .single()

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Create jadwal error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
