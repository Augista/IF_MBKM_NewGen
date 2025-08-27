import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApiMutation } from "./useApi"
import type { CreateLogbookRequest } from "./useCreateLogbookMutation"

interface EditLogbookProps {
  id: string
}

export default function useEditLogbookMutation({ id }: EditLogbookProps) {
  const queryClient = useQueryClient()
  const { mutate: apiMutate, loading } = useApiMutation()

  const { mutate, mutateAsync, isPending, data, isError, isSuccess } = useMutation({
    mutationFn: async (data: CreateLogbookRequest) => {
      if (!data.mbkmId) {
        throw new Error("MBKM tidak boleh kosong saat edit logbook.")
      }

      return await apiMutate(`/api/logbook/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logbook"] })
    },
  })

  return {
    mutate,
    mutateAsync,
    isPending: isPending || loading,
    data,
    isError,
    isSuccess,
  }
}
