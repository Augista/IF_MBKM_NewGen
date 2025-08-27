"use client"

import * as React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { MBKM } from "@/types/mbkm/mbkm"
import useCreateMbkmMutation, { CreateMbkmData } from "@/hooks/useCreateMbkmMutation"
import useEditMahasiswaMBKM from "@/hooks/useEditMahasiswaMBKM"
import { Button } from "@/components/ui/button"
import { FormContent } from "./FormContent"
import Typography from "@/components/Typography"
import { useRouter } from "next/navigation"

interface AddActivityProps {
  mbkmData?: MBKM
}

const FormCard = ({ mbkmData }: AddActivityProps) => {
  const methods = useForm<CreateMbkmData>({
    mode: "onChange",
    defaultValues: {
      nama: "",
      nrp: "",
      angkatan: "",
      tipeMbkm: "",
      jenisKegiatan: "",
      tujuan: "",
      jurusanStudi: "",
      deskripsiAktivitas: "",
      tanggalMulai: "",
      tanggalSelesai: "",
      durasi: 0,
      modelKegiatan: "",
      keterangan: "",
    },
  })

  const { handleSubmit, reset, setValue } = methods
  const router = useRouter()

  const createMutation = useCreateMbkmMutation()
  const updateMutation = useEditMahasiswaMBKM({
    id: mbkmData?.id?.toString() || "", // pastikan string
  })

  const isPending = createMutation.isPending || updateMutation.isPending

  React.useEffect(() => {
    if (mbkmData) {
      setValue("nama", mbkmData.nama)
      setValue("nrp", mbkmData.nrp)
      setValue("angkatan", mbkmData.angkatan)
      setValue("tipeMbkm", mbkmData.tipeMbkm)
      setValue("jenisKegiatan", mbkmData.jenisKegiatan)
      setValue("tujuan", mbkmData.tujuan)
      setValue("jurusanStudi", mbkmData.jurusanStudi)
      setValue("deskripsiAktivitas", mbkmData.deskripsiAktivitas)
      setValue("tanggalMulai", mbkmData.tanggalMulai)
      setValue("tanggalSelesai", mbkmData.tanggalSelesai)
      setValue("durasi", Number(mbkmData.durasi))
      setValue("modelKegiatan", mbkmData.modelKegiatan)
      setValue("keterangan", mbkmData.keterangan)
    }
  }, [mbkmData, setValue, reset])

  const onSubmit = (data: CreateMbkmData) => {
    if (mbkmData) {
      updateMutation.mutate(data, {
        onSuccess: () => router.push("/mbkm"),
      })
    } else {
      createMutation.mutate(data, {
        onSuccess: () => router.push("/mbkm"),
      })
    }
  }

  return (
    <div className="rounded-3xl border-muted-foreground shadow-[0_0px_24px_rgba(0,0,0,0.05)] flex flex-col gap-6 w-full p-8">
      <Typography variant="t1" weight="semibold" className="text-foreground">
        {mbkmData ? "Edit MBKM" : "Tambah MBKM"}
      </Typography>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <FormContent />

          <div className="mt-6 flex justify-end gap-2">
            <Button
              size="lg"
              variant="danger-outline"
              type="button"
              onClick={() => router.back()}
            >
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
