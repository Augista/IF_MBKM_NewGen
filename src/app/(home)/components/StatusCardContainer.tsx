import { CircleCheck, CloudUpload, UserCheck } from "lucide-react"
import StatusCard from "./StatusCard"

export const StatusCardContainer = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatusCard
                title="Verifikasi Dosen"
                description="Belum mendaftar"
                icon={<UserCheck className="w-6 h-6 text-sidebar" />}
            />

            <StatusCard
                title="Transkrip & Silabus"
                description="Belum mengunggah file"
                icon={<CloudUpload className="w-6 h-6 text-sidebar" />}
            />

            <StatusCard
                title="Verifikasi Dosen"
                description="Belum mendaftar"
                icon={<CircleCheck className="w-6 h-6 text-sidebar" />}
            />
        </div>
    )
}