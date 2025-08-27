"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CreateSilabusRequest } from "@/hooks/useCreateSilabusMutation";

export const FormContent = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<CreateSilabusRequest>();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Label htmlFor="silabus">Silabus / Deskripsi</Label>
        <Textarea
          id="silabus"
          {...register("silabus", { required: "Silabus harus diisi" })}
          placeholder="Tulis silabus..."
        />
        {errors.silabus && <p className="text-red-500">{errors.silabus.message}</p>}
      </div>

      <div>
        <Label htmlFor="link">Link (opsional)</Label>
        <Input
          id="link"
          {...register("link")}
          placeholder="https://contoh.com"
        />
      </div>

      <div>
        <Label htmlFor="file">Upload File PDF</Label>
        <Input
          id="file"
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setValue("file", file); 
            }
          }}
        />
      </div>
    </div>
  );
};
