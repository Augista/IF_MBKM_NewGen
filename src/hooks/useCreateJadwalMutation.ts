// hooks/useCreateJadwalMutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useCreateJadwalMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: {
      tanggal: string
      tempat: string
      waktu: string[] 
    }) => {
      const res = await fetch("/api/jadwal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Gagal menambahkan jadwal")
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jadwal"] })
    },
  })
}
