import { useQuery } from "@tanstack/react-query"

export function useGetJadwalByIdQuery(id: string) {
  return useQuery({
    queryKey: ["jadwal", id],
    queryFn: async () => {
      const res = await fetch(`/api/jadwal/${id}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Gagal mengambil detail jadwal")
      return data.data
    },
    enabled: !!id, // hanya fetch kalau id tersedia
  })
}
