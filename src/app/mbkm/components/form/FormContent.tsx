import Input from "@/components/form/Input";
import SelectInput from "@/components/form/SelectInput";
import TextArea from "@/components/form/TextArea";
import { useFormContext, useWatch } from "react-hook-form";

const TIPE_MBKM = [
    { value: "MBKM Flagship", label: "MBKM Flagship" },
    { value: "MBKM Internal ITS", label: "MBKM Internal ITS" },
];

const KEGIATAN_MBKM_FLAGSHIP = [
    { value: "Studi Independen", label: "Studi Independen" },
    { value: "Magang", label: "Magang" },
    { value: "Pertukaran Pelajar", label: "Pertukaran Pelajar" },
];

const KEGIATAN_MBKM_INTERNAL = [
    { value: "Lomba", label: "Lomba" },
    { value: "Penelitian", label: "Penelitian" },
    { value: "Proyek", label: "Proyek" },
    { value: "Wirausaha", label: "Wirausaha" },
    { value: "Magang Internal", label: "Magang Internal" },
    { value: "KKN Tematik", label: "KKN Tematik" },
];

const TAHUN_ANGKATAN = [
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
];

const MODEL_KEGIATAN = [
    { value: "Full Time", label: "Full Time" },
    { value: "Part Time", label: "Part Time" },
];

export const FormContent = () => {
    const { control } = useFormContext();
    const tipeMbkm = useWatch({
        control,
        name: "tipeMbkm",
    });

    const kegiatanOptions =
        tipeMbkm === "MBKM Flagship"
            ? KEGIATAN_MBKM_FLAGSHIP
            : tipeMbkm === "MBKM Internal ITS"
                ? KEGIATAN_MBKM_INTERNAL
                : [];

    return (
        <div className="w-full flex flex-col md:flex-row justify-between gap-4 md:gap-6 lg:gap-12">
            <div className="w-full flex flex-col gap-4">
                <Input
                    id="nama"
                    label="Nama"
                    type="text"
                    placeholder="Masukkan Nama anda"
                    validation={{ required: "Nama wajib diisi!" }}
                />
                <Input
                    id="nrp"
                    label="NRP"
                    type="text"
                    placeholder="Masukkan NRP anda"
                    validation={{ required: "NRP wajib diisi!" }}
                />
                <SelectInput
                    id="angkatan"
                    label="Angkatan"
                    placeholder="2023"
                    isSearchable={false}
                    options={TAHUN_ANGKATAN}
                />
                <SelectInput
                    id="tipeMbkm"
                    label="Tipe MBKM"
                    options={TIPE_MBKM}
                    placeholder="Pilih tipe MBKM"
                    isSearchable={false}
                    validation={{ required: "Tipe MBKM wajib diisi!" }}
                />
                <SelectInput
                    id="jenisKegiatan"
                    label="Jenis Kegiatan"
                    options={kegiatanOptions}
                    placeholder="Pilih jenis kegiatan"
                    isSearchable={false}
                    validation={{ required: "Jenis Kegiatan wajib diisi!" }}
                    isDisabled={!tipeMbkm}
                />
                <Input
                    id="tujuan"
                    label="Tujuan (Universitas / Perusahaan / Unit kerja dll)"
                    type="text"
                    placeholder="Masukkan tujuan anda"
                    validation={{ required: "Tujuan wajib diisi!" }}
                />
                <Input
                    id="jurusanStudi"
                    label="Jurusan Studi Exchange / Magang di Bidang"
                    type="text"
                    placeholder="Masukkan jurusan studi anda"
                    validation={{ required: "Jurusan Studi wajib diisi!" }}
                />
            </div>

            <div className="w-full flex flex-col gap-4">
                <TextArea
                    id="deskripsi"
                    label="Deskripsi aktifitas / MK di Univ tujuan / yang lain"
                    placeholder="Masukkan deskripsi aktifitas"
                    validation={{
                        required: "Deskripsi aktifitas harus diisi",
                    }}
                    containerClassName="flex flex-col gap-1"
                />
                <div className="w-full flex gap-4">
                    <Input
                        id="tanggalMulai"
                        label="Tanggal Mulai"
                        type="date"
                        validation={{ required: "Tanggal Mulai wajib diisi!" }}
                    />
                    <Input
                        id="tanggalSelesai"
                        label="Tanggal Selesai"
                        type="date"
                        validation={{ required: "Tanggal Selesai wajib diisi!" }}
                    />
                </div>
                <Input
                    id="durasi"
                    label="Durasi MBKM"
                    type="number"
                    placeholder="Masukkan durasi MBKM"
                    className="w-full"
                    validation={{ required: "Durasi MBKM wajib diisi!" }}
                />
                <SelectInput
                    id="modelKegiatan"
                    label="Model Kegiatan"
                    options={MODEL_KEGIATAN}
                    placeholder="Pilih model kegiatan"
                    isSearchable={false}
                    validation={{ required: "Model Kegiatan wajib diisi!" }}
                    className="w-full"
                />
            </div>
        </div>
    );
};
