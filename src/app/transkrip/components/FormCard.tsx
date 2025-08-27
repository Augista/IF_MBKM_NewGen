"use client";

import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormContent } from "./FormContent";
import Typography from "@/components/Typography";
import { useRouter } from "next/navigation";
import { Activity } from "@/types/logbook/activity";

interface CreateTranskripRequest {
  transkrip: string;
  file: FileList;
}

interface AddActivityProps {
  transkripData?: Activity;
}

const FormCard = ({ transkripData }: AddActivityProps) => {
  const methods = useForm<CreateTranskripRequest>({
    mode: "onChange",
  });

  const { handleSubmit, reset, setValue } = methods;
  const router = useRouter();
  const [isPending, setIsPending] = React.useState(false);

  React.useEffect(() => {
    if (transkripData) {
      setValue("transkrip", transkripData.kegiatan || "");
    }
  }, [transkripData, setValue]);

  const onSubmit = async (data: CreateTranskripRequest) => {
    setIsPending(true);
    try {
      const formData = new FormData();
      formData.append("file", data.file[0]);
      const res = await fetch("/api/transkrip", {
        method: "POST",
        body: formData, 
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal menyimpan transkrip");
      }

      router.push("/transkrip");
    } catch (error) {
      console.error("Submit Error:", error);
      alert("Terjadi kesalahan saat menyimpan transkrip");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="rounded-3xl border-muted-foreground shadow-[0_0px_24px_rgba(0,0,0,0.05)] flex flex-col gap-6 w-full p-8">
      <Typography variant="t1" weight="semibold" className="text-foreground">
        Upload Transkrip
      </Typography>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full" encType="multipart/form-data">
          <FormContent />

          <div className="mt-6 flex justify-end gap-2">
            <Button size="lg" variant="danger-outline" type="button">
              Batal
            </Button>
            <Button type="submit" size="lg" disabled={isPending}>
              {isPending ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormCard;
