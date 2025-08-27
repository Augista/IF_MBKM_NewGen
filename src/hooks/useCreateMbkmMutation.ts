import { useMutation, useQueryClient } from "@tanstack/react-query"

export interface CreateMbkmData {
  nama: string
  nrp: string
  angkatan: string
  tipeMbkm: string
  jenisKegiatan: string
  tujuan: string
  jurusanStudi: string
  deskripsiAktivitas: string
  tanggalMulai: string
  tanggalSelesai: string
  durasi: Number
  modelKegiatan: string
  keterangan: string
}

export default function useCreateMbkmMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateMbkmData) => {
      const res = await fetch("/api/mbkm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || "Gagal membuat MBKM")
      }

      return await res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mbkm"] }) // refresh list mbkm
    },
  })
}
