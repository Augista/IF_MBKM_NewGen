'use client'

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import EmptyCard from "@/components/EmptyCard"
import TableWrapper from "@/components/tables/TableWrapper"
import LogbookCard from "./components/LogbookCard"

export default function LogbookPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [mbkmId, setMbkmId] = useState<string | null>(searchParams.get("mbkmId"))
  const [logbookData, setLogbookData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch MBKM ID jika belum ada di query
  useEffect(() => {
    const fetchMbkmId = async () => {
      if (mbkmId) return // sudah ada dari URL

      try {
        const res = await fetch("/api/mbkm", { credentials: "include" })
        const json = await res.json()
        const firstMbkm = json.data?.[0]

        if (firstMbkm?.id) {
          setMbkmId(firstMbkm.id)
          router.replace(`/logbook?mbkmId=${firstMbkm.id}`)
        }
      } catch (error) {
        console.error("❌ Error fetching MBKM:", error)
      }
    }

    fetchMbkmId()
  }, [mbkmId, router])

  // Fetch logbook data
  useEffect(() => {
    const fetchLogbook = async () => {
      if (!mbkmId) return

      setIsLoading(true)
      try {
        const res = await fetch(`/api/logbook?mbkm_id=${mbkmId}`, {
          method: "GET",
          credentials: "include",
        })
        const json = await res.json()
        if (!res.ok) throw new Error(json.error || "Gagal mengambil data logbook")

        setLogbookData(json.data || [])
      } catch (error) {
        console.error("❌ Error fetching logbook:", error)
        setLogbookData([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchLogbook()
  }, [mbkmId])

  if (!mbkmId) return <div className="p-6">Sedang mencari MBKM yang aktif...</div>
  if (isLoading) return <div className="p-6">Loading logbook...</div>
  if (logbookData.length === 0) return <EmptyCard />

  return (
    <TableWrapper
      className="min-h-screen"
      CardComponent={LogbookCard}
      data={logbookData}
    />
  )
}
