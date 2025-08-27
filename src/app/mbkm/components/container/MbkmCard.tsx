"use client"

import Typography from "@/components/Typography"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import { useRouter } from "next/navigation"

type MbkmCardProps = {
  id: string
  title: string
  nama: string
  tipeMbkm: string
  dosenMonevNama?: string
  status: "menunggu" | "disetujui" | "ditolak"
  className?: string
}

const InfoRow = ({ label, value }: { label: string; value: string }) => {
  const isStatus = label.toLowerCase() === "status"
  const statusColor = isStatus
    ? value === "disetujui"
      ? "bg-green-100 text-green-800"
      : value === "menunggu"
      ? "bg-yellow-100 text-yellow-800"
      : value === "ditolak"
      ? "bg-red-100 text-red-800"
      : "bg-gray-100 text-gray-800"
    : ""

  return (
    <div className="flex gap-1 items-center">
      <Typography variant="bt" weight="semibold" className="text-card-foreground">
        {label}:
      </Typography>
      {isStatus ? (
        <span className={`px-2 py-1 text-xs rounded-md font-medium ${statusColor}`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      ) : (
        <Typography variant="bt" weight="medium" className="text-card-foreground">
          {value}
        </Typography>
      )}
    </div>
  )
}

const MbkmCard: React.FC<MbkmCardProps> = ({
  id,
  nama,
  tipeMbkm,
  dosenMonevNama = "-",
  status,
  className = "",
}) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDetailClick = () => {
    router.push(`/mbkm/${id}`)
  }

  const handleAjukan = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/mbkm/${id}/ajukan`, {
        method: "POST",
      })

      if (!res.ok) throw new Error("Gagal mengajukan MBKM")

      alert("Pengajuan berhasil dikirim ke pemonev!")
      router.refresh() // supaya status ke-update kalau kamu ambil data dari server
    } catch (error) {
      console.error(error)
      alert("Terjadi kesalahan saat mengajukan.")
    } finally {
      setLoading(false)
    }
  }

  const isMenunggu = status.toLowerCase() === "menunggu"

  return (
    <div
      className={`w-full rounded-3xl border-muted-foreground shadow-[0_0px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_0px_24px_rgba(0,0,0,0.085)] justify-center flex items-center transition-transform duration-300 hover:-translate-y-1 ${className}`}
    >
      <div className="flex flex-col p-6 lg:p-8 gap-4 items-start w-full">
        <Typography variant="h6" weight="semibold" className="text-card-foreground">
          {nama}
        </Typography>

        <div className="flex flex-col gap-2 w-full">
          <InfoRow label="Jenis MBKM" value={tipeMbkm} />
          <InfoRow label="Juri/Pemonev" value={dosenMonevNama} />
          <InfoRow label="Status" value={status} />
        </div>

        <div className="flex gap-2 w-full mt-2">
          <Button
            className="w-full"
            variant="primary-outline"
            onClick={handleDetailClick}
          >
            Lihat Detail
          </Button>

          {isMenunggu && (
            <Button
              className="w-full"
              variant="primary-default"
              onClick={handleAjukan}
              disabled={loading}
            >
              {loading ? "Mengirim..." : "Ajukan"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default MbkmCard
