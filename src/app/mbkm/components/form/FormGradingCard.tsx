"use client";

import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MBKM } from "../../../../types/mbkm/mbkm";
import useCreateMbkmMutation, { CreateMbkmRequest } from "@/hooks/useCreateMbkmMutation";
import useEditMbkmMutation from "@/hooks/useEditMbkmMutation";
import { Button } from "@/components/ui/button";
import Typography from "@/components/Typography";
import { useRouter } from "next/navigation";
import SelectInput from "@/components/form/SelectInput";
import { FormGradingContent } from "./FormGradingContent";

const MATA_KULIAH = [
    { value: "Capstone Project", label: "Capstone Project" },
    { value: "Big Data", label: "Big Data" },
];

interface AddActivityProps {
    mbkmData?: MBKM;
}

const FormGradingCard = ({ mbkmData }: AddActivityProps) => {
    const methods = useForm<CreateMbkmRequest>({
        mode: "onChange",
    });

    const { handleSubmit, reset, setValue } = methods;
    const router = useRouter();

    const createMutation = useCreateMbkmMutation();
    const updateMutation = useEditMbkmMutation({
        id: mbkmData?.id || "",
    });

    const isPending = createMutation.isPending;

    React.useEffect(() => {
        if (mbkmData) {
            setValue("nama", mbkmData.nama);
            setValue("nrp", mbkmData.nrp);
            setValue("angkatan", mbkmData.angkatan);
            setValue("tipeMbkm", mbkmData.tipeMbkm);
            setValue("jenisKegiatan", mbkmData.jenisKegiatan);
            setValue("tujuan", mbkmData.tujuan);
            setValue("jurusanStudi", mbkmData.jurusanStudi);
            setValue("deskripsiAktivitas", mbkmData.deskripsiAktivitas);
            setValue("tanggalMulai", mbkmData.tanggalMulai);
            setValue("tanggalSelesai", mbkmData.tanggalSelesai);
            setValue("durasi", mbkmData.durasi);
            setValue("modelKegiatan", mbkmData.modelKegiatan);
            setValue("keterangan", mbkmData.keterangan);
        }
    }, [mbkmData, setValue, reset]);

    const onSubmit = (data: CreateMbkmRequest) => {
        // if (mbkmData) {
        //     updateMutation.mutate(data);
        // } else {
        //     createMutation.mutate(data);
        // }
        router.push("/mbkm");
    };

    return (
        <div className="flex flex-col gap-6">
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <SelectInput
                        id="tipeMbkm"
                        label="Mata Kuliah"
                        options={MATA_KULIAH}
                        placeholder="Pilih Mata Kuliah"
                        isSearchable={false}
                        containerClassName="flex flex-col gap-2"
                    />
                </form>
            </FormProvider>

            <div className="rounded-3xl border-muted-foreground shadow-[0_0px_24px_rgba(0,0,0,0.05)] flex flex-col gap-6 w-full p-8">
                <Typography
                    variant="t1"
                    weight="semibold"
                    className="text-foreground"
                >
                    Mata Kuliah Ekivalensi
                </Typography>

                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <FormGradingContent />

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
        </div>
    );
};

export default FormGradingCard;