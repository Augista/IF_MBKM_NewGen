import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { CreateMbkmData } from "./useCreateMbkmMutation"

export default function useEditMahasiswaMBKM({ id }: { id: string }) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateMbkmData) => {
      const res = await fetch(`/api/mbkm/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || "Gagal mengupdate MBKM")
      }

      return await res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mbkm"] })
    },
  })
}
