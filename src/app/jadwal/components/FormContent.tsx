import Input from "@/components/form/Input";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";

const timeOptions = ["12:00", "13:00", "14:00", "15:00"];

export const FormContent = () => {
    const { setValue, watch } = useFormContext();
    const selectedTimes: string[] = watch("waktu") || [];

    const toggleTime = (time: string) => {
        const updatedTimes = selectedTimes.includes(time)
            ? selectedTimes.filter((t) => t !== time)
            : [...selectedTimes, time];

        setValue("waktu", updatedTimes, { shouldValidate: true });
    };

    return (
        <div className="w-full flex flex-col md:flex-row justify-between gap-4 md:gap-6 lg:gap-12">
            <div className="w-full flex flex-col gap-4">
                <Input
                    id="tanggal"
                    label="Tanggal"
                    type="date"
                    validation={{ required: "Tanggal wajib diisi!" }}
                />
                <Input
                    id="tempat"
                    label="Tempat"
                    type="text"
                    placeholder="Masukkan tempat"
                    validation={{ required: "Tempat wajib diisi!" }}
                />

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Waktu</label>
                    <div className="flex gap-2 flex-wrap">
                        {timeOptions.map((time) => (
                            <Button
                                key={time}
                                type="button"
                                variant={selectedTimes.includes(time) ? "primary-default" : "primary-outline"}
                                onClick={() => toggleTime(time)}
                            >
                                {time}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
