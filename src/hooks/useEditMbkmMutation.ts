import { useMutation, useQueryClient } from "@tanstack/react-query"

interface EditMbkmStatusPayload {
  id: number
  status: "disetujui" | "ditolak" | "menunggu"
}

export default function useEditMbkmStatus(p0: { id: string }) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, status }: EditMbkmStatusPayload) => {
      const res = await fetch(`/api/mbkm/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || "Gagal memperbarui status")
      }

      return await res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mbkm"] })
    },
  })
}
