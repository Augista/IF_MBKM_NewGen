"use client"

import Input from "@/components/form/Input"
import { Button } from "@/components/ui/button"

export const FormContent = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <label htmlFor="transkrip" className="font-medium text-sm">
        Upload Transkrip:
      </label>

      <Input
        id="file"
        name="file"
        label="Transkrip"
        type="file"
        accept=".pdf"
        required
        helperText="Ukuran maksimum file 3 Mb dengan format .pdf"
        helperTextClassName="!text-sm"
        validation={{ required: "File wajib diunggah" }}
      />

      <Button type="submit" className="w-fit">
        Upload
      </Button>
    </div>
  )
}
