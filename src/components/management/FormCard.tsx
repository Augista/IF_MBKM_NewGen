"use client";

import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Typography from "@/components/Typography";
import { useRouter } from "next/navigation";
import { Activity } from "@/types/logbook/activity";
import useCreateLogbookMutation, { CreateLogbookRequest } from "@/hooks/useCreateLogbookMutation";
import useEditLogbookMutation from "@/hooks/useEditLogbookMutation";
import { FormContent } from "./FormContent";

interface AddActivityProps {
    logbookData?: Activity;
}

const FormCard = ({ logbookData }: AddActivityProps) => {
    const methods = useForm<CreateLogbookRequest>({
        mode: "onChange",
    });

    const { handleSubmit, reset, setValue } = methods;
    const router = useRouter();

    const createMutation = useCreateLogbookMutation();
    const updateMutation = useEditLogbookMutation({
        id: logbookData?.id || "",
    });

    const isPending = createMutation.isPending;

    React.useEffect(() => {
        if (logbookData) {
            setValue("cpmk", logbookData.cpmk);
            setValue("pekan", logbookData.pekan);
            setValue("tanggalMulai", logbookData.tanggalMulai);
            setValue("tanggalSelesai", logbookData.tanggalSelesai);
            setValue("durasi", logbookData.durasi);
            setValue("kegiatan", logbookData.kegiatan);
            setValue("bukti", logbookData.bukti);
        }
    }, [logbookData, setValue, reset]);

    const onSubmit = (data: CreateLogbookRequest) => {
        // if (mbkmData) {
        //     updateMutation.mutate(data);
        // } else {
        //     createMutation.mutate(data);
        // }
        router.push("/dashboard/management");
    };

    return (
        <div className="rounded-3xl border-muted-foreground shadow-[0_0px_24px_rgba(0,0,0,0.05)] flex flex-col gap-6 w-full p-8">
            <Typography
                variant="t1"
                weight="semibold"
                className="text-foreground"
            >
                Alokasi Role Dosen
            </Typography>

            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <FormContent />

                    <div className="mt-6 flex justify-end gap-2">
                        <Button
                            size="lg"
                            variant="danger-outline"
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            size="lg"
                        >
                            Simpan
                        </Button>
                    </div>
                </form>
            </FormProvider>

        </div>
    );
};

export default FormCard;