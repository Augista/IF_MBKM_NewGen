import { useMutation } from "@tanstack/react-query"

export const useAjukanMbkm = (id: string) => {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/mbkm/${id}/ajukan`, {
        method: "POST",
      })
      if (!res.ok) throw new Error("Gagal mengajukan")
      return res.json()
    },
  })
}
