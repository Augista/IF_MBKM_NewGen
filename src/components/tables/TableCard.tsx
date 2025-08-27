'use client'
import Typography from "@/components/Typography";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import { Shuffle } from "lucide-react";

interface TableCardProps {
    title: string;
    uploadLabel?: string;
    uploadHref?: string;
    TableComponent: React.ReactNode;
    className?: string;
}

const TableCard: React.FC<TableCardProps> = ({
    title,
    uploadLabel,
    uploadHref,
    TableComponent,
    className = "",
}) => {
    const router = useRouter();

    if (title === "Monev") {
        return (
            <div className={`w-screen md:w-full ${className}`}>
                {TableComponent}
            </div>
        )
    }

    if (title === "User") {
        return (
            <div className={`w-screen md:w-full rounded-3xl border-muted-foreground shadow-[0_0px_24px_rgba(0,0,0,0.05)] p-8 flex flex-col gap-4 ${className}`}>
                <Typography
                    variant="t1"
                    weight="semibold"
                    className="text-card-foreground"
                >
                    Alokasi Role Dosen
                </Typography>

                {TableComponent}
            </div>
        )
    }

    return (
        <div className={`w-screen md:w-full rounded-3xl border-muted-foreground shadow-[0_0px_24px_rgba(0,0,0,0.05)] ${className}`}>
            {title === "Ekivalensi" ? (
                <div className="w-full flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 border-muted-foreground shadow-[0_0px_24px_rgba(0,0,0,0.05)] p-8 rounded-3xl">
                    <div className="flex flex-col gap-1">
                        <Typography
                            variant="t1"
                            weight="semibold"
                            className="text-card-foreground"
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="bt"
                            weight="medium"
                            className="text-sm text-card-foreground"
                        >
                            Referensi Ekuivalensi Mata Kuliah Dapat Dilihat Pada Mapping Ekivalensi MK
                        </Typography>
                    </div>

                    <Button
                        variant="primary-default"
                        size="lg"
                        className="w-fit"
                    >
                        Lihat Mapping Ekivalensi
                        <Shuffle />
                    </Button>
                </div>
            ) : (
                <div className="w-full flex justify-between items-center border-muted-foreground shadow-[0_0px_24px_rgba(0,0,0,0.05)] p-8 rounded-3xl">
                    <Typography
                        variant="t1"
                        weight="semibold"
                        className="text-card-foreground"
                    >
                        {title}
                    </Typography>

                    {uploadLabel &&
                        <Button
                            variant="primary-default"
                            size="lg"
                            onClick={() => {
                                if (uploadHref) router.push(uploadHref);
                            }}
                        >
                            {uploadLabel}
                        </Button>
                    }
                </div>
            )}

            <div className="w-full flex px-6">
                {TableComponent}
            </div>
        </div>
    );
};

export default TableCard;
