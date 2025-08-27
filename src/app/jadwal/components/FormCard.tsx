"use client";

import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import useEditMbkmMutation from "@/hooks/useEditMbkmMutation";
import { Button } from "@/components/ui/button";
import { FormContent } from "./FormContent";
import Typography from "@/components/Typography";
import { useRouter } from "next/navigation";
import useCreateJadwalMonevMutation, { CreateJadwalMonevRequest } from "@/hooks/useCreateJadwalMonevMutation";
import { JadwalLecture } from "@/types/mbkm/jadwal";

interface AddJadwalProps {
    jadwalLectureData?: JadwalLecture;
}

const FormCard = ({ jadwalLectureData }: AddJadwalProps) => {
    const methods = useForm<CreateJadwalMonevRequest>({
        mode: "onChange",
        defaultValues: {
            waktu: [],
        },
    });

    const { handleSubmit, reset, setValue } = methods;
    const router = useRouter();

    const createMutation = useCreateJadwalMonevMutation();
    // const updateMutation = useEditMbkmMutation({
    //     id: jadwalLectureData?.id || "",
    // });

    const isPending = createMutation.isPending;

    React.useEffect(() => {
        if (jadwalLectureData) {
            setValue("tanggal", jadwalLectureData.tanggal);
            setValue("tempat", jadwalLectureData.tempat);
            setValue("waktu", jadwalLectureData.waktu || []);
        }
    }, [jadwalLectureData, setValue, reset]);

    const onSubmit = (data: CreateJadwalMonevRequest) => {
    const payload: CreateJadwalMonevRequest = {
        ...data,
        tanggal: typeof data.tanggal === "string"
        ? data.tanggal
        : new Date(data.tanggal).toISOString().split("T")[0],
    };

    createMutation.mutate(payload, {
        onSuccess: () => {
        router.push("/jadwal");
        },
        onError: (error) => {
        console.error("Gagal menyimpan jadwal:", error);
        },
    });
};


    return (
        <div className="rounded-3xl border-muted-foreground shadow-[0_0px_24px_rgba(0,0,0,0.05)] flex flex-col gap-6 w-full p-8">
            <Typography
                variant="t1"
                weight="semibold"
                className="text-foreground"
            >
                Penjadwalan Monev
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