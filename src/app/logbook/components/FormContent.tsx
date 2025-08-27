"use client"

import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CreateLogbookRequest } from "@/hooks/useCreateLogbookMutation"

export const FormContent = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<CreateLogbookRequest>()

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Label htmlFor="pekan">Pekan ke</Label>
        <Input
          id="pekan"
          type="number"
          {...register("pekan", { required: "Pekan ke wajib diisi" })}
        />
        {errors.pekan && <p className="text-red-500">{errors.pekan.message}</p>}
      </div>

      <div className="flex gap-4">
        <div className="w-full">
          <Label htmlFor="tanggalMulai">Tanggal Mulai</Label>
          <Input
            id="tanggalMulai"
            type="date"
            {...register("tanggalMulai", { required: "Tanggal mulai wajib diisi" })}
          />
          {errors.tanggalMulai && <p className="text-red-500">{errors.tanggalMulai.message}</p>}
        </div>
        <div className="w-full">
          <Label htmlFor="tanggalSelesai">Tanggal Selesai</Label>
          <Input
            id="tanggalSelesai"
            type="date"
            {...register("tanggalSelesai", { required: "Tanggal selesai wajib diisi" })}
          />
          {errors.tanggalSelesai && <p className="text-red-500">{errors.tanggalSelesai.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="durasi">Durasi (Bulan)</Label>
        <Input
          id="durasi"
          type="number"
          {...register("durasi", { required: "Durasi wajib diisi" })}
        />
        {errors.durasi && <p className="text-red-500">{errors.durasi.message}</p>}
      </div>

      <div>
        <Label htmlFor="kegiatan">Kegiatan</Label>
        <Textarea
          id="kegiatan"
          {...register("kegiatan", { required: "Kegiatan wajib diisi" })}
          placeholder="Deskripsikan kegiatan yang dilakukan..."
        />
        {errors.kegiatan && <p className="text-red-500">{errors.kegiatan.message}</p>}
      </div>

      <div>
        <Label htmlFor="file">Upload File CPMK (PDF)</Label>
        <Input
          id="file"
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) setValue("file", file)
          }}
        />
      </div>

      <div>
        <Label htmlFor="buktiFile">Upload Bukti Kegiatan (PDF)</Label>
        <Input
          id="buktiFile"
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) setValue("buktiFile", file)
          }}
        />
      </div>
    </div>
  )
}
