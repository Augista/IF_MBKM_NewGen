"use client";

import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormContent } from "./FormContent";
import Typography from "@/components/Typography";
import { useRouter } from "next/navigation";
import { Activity } from "@/types/logbook/activity";
import { CreateSilabusRequest } from "@/hooks/useCreateSilabusMutation";
import useCreateSilabusMutation from "@/hooks/useCreateSilabusMutation";

interface AddActivityProps {
  silabusData?: Activity;
}

const FormCard = ({ silabusData }: AddActivityProps) => {
  const methods = useForm<CreateSilabusRequest>({
    mode: "onChange",
  });

  const { handleSubmit, setValue } = methods;
  const router = useRouter();

  const createMutation = useCreateSilabusMutation();

  const isPending = createMutation.isPending;

  React.useEffect(() => {
    if (silabusData) {
      setValue("silabus", silabusData.kegiatan || ""); 
      setValue("link", silabusData.bukti || "");
    }
  }, [silabusData, setValue]);

  const onSubmit = (data: CreateSilabusRequest) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        router.push("/silabus");
      },
    });
  };

  return (
    <div className="rounded-3xl border-muted-foreground shadow-[0_0px_24px_rgba(0,0,0,0.05)] flex flex-col gap-6 w-full p-8">
      <Typography variant="t1" weight="semibold" className="text-foreground">
        Upload Silabus
      </Typography>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
