import { useQuery } from "@tanstack/react-query"

export function useGetJadwalQuery() {
  return useQuery({
    queryKey: ["jadwal"],
    queryFn: async () => {
      const res = await fetch("/api/jadwal")
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Gagal mengambil data jadwal")
      return data.data
    },
  })
}