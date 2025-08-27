import Typography from "@/components/Typography";
import React from "react";

type StatusCardProps = {
    title: string;
    description: string;
    className?: string;
    icon: React.ReactNode;
};

const StatusCard: React.FC<StatusCardProps> = ({
    title,
    description,
    className = "",
    icon,
}) => {
    return (
        <div className={`w-full rounded-3xl border-muted-foreground shadow-[0_0px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_0px_24px_rgba(0,0,0,0.085)] justify-center flex items-center cursor-pointer transition-transform duration-300 hover:-translate-y-1 ${className}`}>
            <div className="flex flex-col p-6 lg:p-8 gap-4 items-start w-full">
                <div className="flex justify-center items-center bg-input rounded-lg p-2">
                    {icon}
                </div>

                <div className="flex flex-col gap-1">
                    <Typography
                        variant="bt"
                        weight="semibold"
                        className="md:text-lg text-card-foreground">
                        {title}
                    </Typography>

                    <Typography
                        variant="l2"
                        weight="medium"
                        className="md:text-md text-muted-foreground">
                        <span>{description}</span>
                    </Typography>

                </div>

            </div>
        </div>
    );
};

export default StatusCard;