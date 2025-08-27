// hooks/useUpdateJadwalMutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useUpdateJadwalMutation(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: {
      tanggal: string
      tempat: string
      waktu: string[]
    }) => {
      const res = await fetch(`/api/jadwal/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Gagal mengupdate jadwal")
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jadwal"] })
      queryClient.invalidateQueries({ queryKey: ["jadwal", id] })
    },
  })
}
