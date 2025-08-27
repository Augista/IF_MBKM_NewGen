import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApiMutation } from "./useApi"

export type CreateLogbookRequest = {
  mbkmId: string
  pekan: number
  tanggalMulai: string
  tanggalSelesai: string
  durasi: number
  kegiatan: string
  file: File // CPMK
  buktiFile: File // Bukti
}

export default function useCreateLogbookMutation() {
  const queryClient = useQueryClient()
  const { mutate: apiMutate, loading } = useApiMutation()

  const { mutate, mutateAsync, isPending, data, isError } = useMutation({
    mutationFn: async (data: CreateLogbookRequest) => {
      const formData = new FormData()

      formData.append("file", data.file)
      formData.append("buktiFile", data.buktiFile)
      formData.append("mbkmId", data.mbkmId)
      formData.append("pekan", data.pekan.toString())
      formData.append("tanggalMulai", data.tanggalMulai)
      formData.append("tanggalSelesai", data.tanggalSelesai)
      formData.append("durasi", data.durasi.toString())
      formData.append("kegiatan", data.kegiatan)

      return await apiMutate("/api/logbook", {
        method: "POST",
        body: formData,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logbook"] })
    },
  })

  return { mutate, mutateAsync, isPending: isPending || loading, data, isError }
}
