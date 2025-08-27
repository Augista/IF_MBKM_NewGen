'use client'

import Typography from "@/components/Typography";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface EmptyCardProps {
    className?: string;
    message?: string;
    buttonText?: string;
    buttonHref?: string;
}

const EmptyCard = ({
    className = "",
    message = "Anda Belum Mendaftar Kegiatan MBKM, Silahkan Mendaftar",
    buttonText = "Register",
    buttonHref = "/mbkm/form",
}: EmptyCardProps) => {
    const router = useRouter();

    return (
        <div className="min-h-screen max-h-screen p-8 flex items-center justify-self-center">
            <div className={`rounded-3xl border-muted-foreground shadow-[0_0px_24px_rgba(0,0,0,0.05)] flex flex-col gap-6 items-center h-fit p-8 md:p-16 ${className}`}>
                <Typography
                    variant="t1"
                    weight="semibold"
                    className="text-foreground text-center"
                >
                    {message}
                </Typography>

                <Button
                    variant="primary-outline"
                    size="lg"
                    onClick={() => router.push(buttonHref)}
                >
                    {buttonText}
                </Button>
            </div>
        </div>
    );
};

export default EmptyCard;