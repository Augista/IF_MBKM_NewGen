import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApiMutation } from "./useApi"

export type CreateJadwalMonevRequest = {
  tanggal: string
  tempat: string
  waktu: string[]
}

export default function useCreateJadwalMonevMutation() {
  const queryClient = useQueryClient()
  const { mutate: apiMutate, loading } = useApiMutation()

  const { mutate, mutateAsync, isPending, data, isError } = useMutation({
    mutationFn: async (data: CreateJadwalMonevRequest) => {
      return await apiMutate("/api/jadwal", {
        method: "POST",
        body: JSON.stringify(data),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jadwal"] })
    },
  })

  return { mutate, mutateAsync, isPending: isPending || loading, data, isError }
}
