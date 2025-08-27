import Input from "@/components/form/Input";
import SelectInput from "@/components/form/SelectInput";
import TextArea from "@/components/form/TextArea";
import Typography from "@/components/Typography";

export const FormGradingContent = () => {
    return (
        <div className="w-full flex flex-col md:flex-row justify-between gap-4 md:gap-6 lg:gap-12">
            <div className="w-full flex flex-col gap-6">
                {/* informasi umum */}
                <section className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                        <Typography
                            variant="bt"
                            weight="semibold"
                            className="text-accent"
                        >
                            Completion Time
                        </Typography>

                        <Typography
                            variant="bt"
                            weight="semibold"
                            className="text-foreground"
                        >
                            2025-06-30 05:12:21
                        </Typography>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Typography
                            variant="bt"
                            weight="semibold"
                            className="text-accent"
                        >
                            MK/Job di Instansi/Univ Tujuan
                        </Typography>

                        <Typography
                            variant="bt"
                            weight="semibold"
                            className="text-foreground"
                        >
                            Data Analyst
                        </Typography>
                    </div>
                </section>

                <hr className="border-t border-1 border-input" />

                {/* Deatil MK Ekivalensi */}
                <section className="flex flex-col gap-3">
                    <Typography
                        variant="t1"
                        weight="semibold"
                        className="text-foreground"
                    >
                        Detail MK Ekivalensi
                    </Typography>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 gap-x-6">
                        <div className="flex flex-col gap-2">
                            <Typography
                                variant="bt"
                                weight="semibold"
                                className="text-accent"
                            >
                                MK di ITS
                            </Typography>

                            <Typography
                                variant="bt"
                                weight="semibold"
                                className="text-foreground"
                            >
                                IF123456 - Big Data
                            </Typography>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Typography
                                variant="bt"
                                weight="semibold"
                                className="text-accent"
                            >
                                Tahun Akademik
                            </Typography>

                            <Typography
                                variant="bt"
                                weight="semibold"
                                className="text-foreground"
                            >
                                2024-2025
                            </Typography>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Typography
                                variant="bt"
                                weight="semibold"
                                className="text-accent"
                            >
                                Prodi MK di ITS
                            </Typography>

                            <Typography
                                variant="bt"
                                weight="semibold"
                                className="text-foreground"
                            >
                                S-1 Teknik Informatika
                            </Typography>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Typography
                                variant="bt"
                                weight="semibold"
                                className="text-accent"
                            >
                                Semester MK Ekivalensi
                            </Typography>

                            <Typography
                                variant="bt"
                                weight="semibold"
                                className="text-foreground"
                            >
                                Ganjil
                            </Typography>
                        </div>

                        <Input
                            id="persentase"
                            label="Persentase (%)"
                            type="number"
                            placeholder="Masukkan persentase"
                            validation={{ required: "Persentase wajib diisi!" }}
                            labelTextClasname="text-accent"
                        />
                    </div>
                </section>

                <hr className="border-t border-1 border-input" />

                <section className="flex flex-col gap-3">
                    <Typography
                        variant="t1"
                        weight="semibold"
                        className="text-foreground"
                    >
                        Nilai Akhir
                    </Typography>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 gap-x-6">
                        <Input
                            id="nilaiHuruf"
                            label="Nilai Huruf"
                            type="text"
                            placeholder="Masukkan nilai huruf"
                            validation={{ required: "Nilai huruf wajib diisi!" }}
                        />

                        <Input
                            id="nilaiAngka"
                            label="Nilai Angka"
                            type="number"
                            placeholder="Masukkan nilai angka"
                            validation={{ required: "Nilai angka wajib diisi!" }}
                        />
                    </div>

                    <TextArea
                        id="deskripsi"
                        label="Catatan/Deskripsi"
                        placeholder="Masukkan catatan/deskripsi"
                        containerClassName="flex flex-col gap-1"
                    />
                </section>
            </div>
        </div>
    );
};
