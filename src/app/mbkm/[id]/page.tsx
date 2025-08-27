

import { notFound } from "next/navigation"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"
import { db } from "@/lib/db"
import Typography from "@/components/Typography"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Params = { id: string }

type PageProps = {
  params: Params
}

export default async function MbkmDetailPage({ params }: PageProps) {
  const { id } = params

  const token = (await cookies()).get("authToken")?.value
  const user = verifyToken(token ?? "")
  if (!user) return notFound()

  const { rows } = await db.query(
    `
    SELECT m.*, u.nama AS dosen_monev_nama
    FROM mbkm m
    LEFT JOIN users u ON u.id = m.dosen_monev_id
    WHERE m.id = $1 AND m.user_id = $2
    `,
    [id, user.id]
  )

  const mbkm = rows[0]
  if (!mbkm) return notFound()

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <Typography variant="h4" weight="bold" className="mb-6">
        Detail MBKM
      </Typography>

      <div className="space-y-2">
        <p><strong>Nama:</strong> {mbkm.nama}</p>
        <p><strong>Tipe MBKM:</strong> {mbkm.tipe_mbkm}</p>
        <p><strong>Jurusan Studi:</strong> {mbkm.jurusan_studi}</p>
        <p>
  <strong>Tanggal:</strong>{" "}
  {new Date(mbkm.tanggal_mulai).toLocaleDateString("id-ID")} -{" "}
  {new Date(mbkm.tanggal_selesai).toLocaleDateString("id-ID")}
</p>
        <p><strong>Status:</strong> {mbkm.status}</p>
        <p><strong>Dosen Monev:</strong> {mbkm.dosen_monev_nama || "-"}</p>
      </div>

      <div className="flex gap-4 mt-6">
        <Link href={`/logbook?mbkmId=${id}`}>
            <Button>Lihat Logbook</Button>
        </Link>
        {mbkm.status === "Belum Diajukan" && (
          <form action={`/api/mbkm/${id}/ajukan`} method="POST">
            <Button type="submit" variant="primary-default">
              Ajukan
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
