'use client'

import EmptyCard from "@/components/EmptyCard"
import { MbkmCardContainer } from "./components/container/MbkmCardContainer"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function MbkmPage() {
  const router = useRouter()

  const {
    data: mbkmData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["mbkm"],
    queryFn: async () => {
      const res = await fetch("/api/mbkm", {
        credentials: "include", // penting agar authToken dikirim via cookie
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Gagal mengambil data MBKM")
      return json.data
    },
  })

  if (isLoading) return <div className="p-8">Loading...</div>
  if (isError) return <div className="p-8 text-red-500">Terjadi kesalahan saat memuat data MBKM.</div>
  if (!mbkmData || mbkmData.length === 0) return <EmptyCard />

  return (
    <div className="flex flex-col gap-8 p-8 min-h-screen">
      <div className="flex justify-end">
        <Button onClick={() => router.push("/mbkm/form")}>+ Tambah MBKM</Button>
      </div>

      <MbkmCardContainer mbkmList={mbkmData} />
    </div>
  )
}
