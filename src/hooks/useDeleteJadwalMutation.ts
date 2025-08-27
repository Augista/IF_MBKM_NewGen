// hooks/useDeleteJadwalMutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useDeleteJadwalMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/jadwal/${id}`, {
        method: "DELETE",
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Gagal menghapus jadwal")
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jadwal"] })
    },
  })
}
