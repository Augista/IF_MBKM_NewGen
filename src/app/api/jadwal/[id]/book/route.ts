import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params
  const jadwalId = id

  try {
    const token = (await cookies()).get("authToken")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized - No token" }, { status: 401 });

    const user = verifyToken(token);
    if (!user || user.role !== "mahasiswa") {
      return NextResponse.json({ error: "Unauthorized - Not mahasiswa" }, { status: 401 });
    }

    const { waktuDipilih, mbkmId } = await request.json();

    const { data: existing, error: existingError } = await supabase
      .from("booking_jadwal")
      .select("id")
      .eq("jadwal_id", jadwalId)
      .eq("waktu_dipilih", waktuDipilih);

    if (existingError) throw existingError;
    if (existing && existing.length > 0) {
      return NextResponse.json({ error: "Time slot already booked" }, { status: 409 });
    }

    const { data, error } = await supabase
      .from("booking_jadwal")
      .insert({
        jadwal_id: jadwalId,
        mahasiswa_id: user.id,
        mbkm_id: mbkmId,
        waktu_dipilih: waktuDipilih,
        status: "Booked"
      })
      .select("*")
      .single();

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Book jadwal error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}