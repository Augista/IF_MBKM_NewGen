// hooks/useBookJadwalMutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useBookJadwalMutation(jadwalId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: {
      waktuDipilih: string
      mbkmId: string
    }) => {
      const res = await fetch(`/api/jadwal/${jadwalId}/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Gagal booking jadwal")
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jadwal"] })
      queryClient.invalidateQueries({ queryKey: ["jadwal", jadwalId] })
    },
  })
}
