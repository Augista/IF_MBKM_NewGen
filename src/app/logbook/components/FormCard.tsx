"use client"

import * as React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { FormContent } from "./FormContent"
import Typography from "@/components/Typography"
import { useRouter } from "next/navigation"
import { Activity } from "@/types/logbook/activity"
import useCreateLogbookMutation, { CreateLogbookRequest } from "@/hooks/useCreateLogbookMutation"
import useEditLogbookMutation from "@/hooks/useEditLogbookMutation"
import { useQuery } from "@tanstack/react-query"

interface AddActivityProps {
  logbookData?: Activity
}

const FormCard = ({ logbookData }: AddActivityProps) => {
  const methods = useForm<CreateLogbookRequest>({ mode: "onChange" })
  const { handleSubmit, reset, setValue, register } = methods
  const router = useRouter()

  const createMutation = useCreateLogbookMutation()
  const updateMutation = useEditLogbookMutation({ id: logbookData?.id || "" })

  const isPending = createMutation.isPending || updateMutation.isPending

  const { data: mbkmList } = useQuery({
    queryKey: ["mbkm"],
    queryFn: async () => {
      const res = await fetch("/api/mbkm")
      const json = await res.json()
      return json.data
    },
  })

  React.useEffect(() => {
    if (logbookData) {
      setValue("mbkmId", logbookData.mbkmId)
      setValue("pekan", logbookData.pekan)
      setValue("tanggalMulai", logbookData.tanggalMulai)
      setValue("tanggalSelesai", logbookData.tanggalSelesai)
      setValue("durasi", logbookData.durasi)
      setValue("kegiatan", logbookData.kegiatan)
    }
  }, [logbookData, setValue, reset])

  const onSubmit = async (data: CreateLogbookRequest) => {
    if (!data.file || !data.buktiFile) {
      alert("Mohon unggah file CPMK dan Bukti terlebih dahulu.")
      return
    }

    if (logbookData) {
      updateMutation.mutate(data)
    } else {
      createMutation.mutate(data)
    }

    router.push("/logbook")
  }

  return (
    <div className="rounded-3xl border-muted-foreground shadow-[0_0px_24px_rgba(0,0,0,0.05)] flex flex-col gap-6 w-full p-8">
      <Typography variant="t1" weight="semibold" className="text-foreground">
        Tambah Kegiatan
      </Typography>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
          {/* Select MBKM */}
          <div>
            <label htmlFor="mbkmId" className="block text-sm font-medium text-gray-700">
              Pilih MBKM
            </label>
            <select
              {...register("mbkmId", { required: true })}
              id="mbkmId"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              defaultValue=""
            >
              <option value="" disabled>Pilih salah satu</option>
              {mbkmList?.map((mbkm: any) => (
                <option key={mbkm.id} value={mbkm.id}>
                  {mbkm.nama}
                </option>
              ))}
            </select>
          </div>

          <FormContent />

          <div className="mt-6 flex justify-end gap-2">
            <Button size="lg" variant="danger-outline" type="button" onClick={() => router.push("/logbook")}>
              Batal
            </Button>
            <Button type="submit" size="lg" disabled={isPending}>
              {isPending ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default FormCard
