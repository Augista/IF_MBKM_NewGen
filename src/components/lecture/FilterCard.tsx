'use client'
import SelectInput from "@/components/form/SelectInput";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";

const BIDANG_MBKM = [
    { value: "MBKM Flagship", label: "MBKM Flagship" },
    { value: "MBKM Internal ITS", label: "MBKM Internal ITS" },
];

const SEMESTER = [
    { value: "Ganjil", label: "Ganjil" },
    { value: "Genap", label: "Genap" },
];

const TAHUN_AKADEMIK = [
    { value: "2025-2026", label: "2025-2026" },
    { value: "2024-2025", label: "2024-2025" },
    { value: "2023-2024", label: "2023-2024" },
];

const STATUS_MONEV = [
    { value: "Semua", label: "Semua" },
    { value: "Belum Diverifikasi", label: "Belum Diverifikasi" },
    { value: "Ditolak", label: "Ditolak" },
    { value: "Diterima", label: "Diterima" },
];

export const FilterCard = () => {
    const methods = useForm({
        defaultValues: {
            bidang: BIDANG_MBKM[0],
            semester: SEMESTER[0],
            tahun: TAHUN_AKADEMIK[0],
            monev: STATUS_MONEV[0],
        },
    });

    return (
        <FormProvider {...methods}>
            <form className="flex flex-col gap-4">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <SelectInput
                        id="bidang"
                        label="Bidang MBKM"
                        options={BIDANG_MBKM}
                        placeholder="Pilih bidang"
                        isSearchable={false}
                        containerClassName="w-full"
                    />
                    <SelectInput
                        id="semester"
                        label="Semester"
                        options={SEMESTER}
                        placeholder="Pilih semester"
                        isSearchable={false}
                        containerClassName="w-full"
                    />
                    <SelectInput
                        id="tahun"
                        label="Tahun Akademik"
                        options={TAHUN_AKADEMIK}
                        placeholder="Pilih tahun"
                        isSearchable={false}
                        containerClassName="w-full"
                    />
                    <SelectInput
                        id="monev"
                        label="Status Monev"
                        options={STATUS_MONEV}
                        placeholder="Pilih status"
                        isSearchable={false}
                        containerClassName="w-full"
                    />
                </div>
                <Button
                    type="submit"
                    className="self-end"
                >
                    Tampilkan
                </Button>
            </form>
        </FormProvider>
    );
};
