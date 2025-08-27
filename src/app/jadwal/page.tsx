'use client'
import TableWrapper from "@/components/tables/TableWrapper";
import { useAuth } from "@/context/AuthContext";
import JadwalCardLecture from "./components/JadwalCardLecture";
import JadwalCardUser from "./components/JadwalCardUser";

export default function JadwalPage() {
    const { user } = useAuth();
    const isLecture = user?.role === 'dosen';
    return (
        <TableWrapper
            className="min-h-screen"
            CardComponent={isLecture ? JadwalCardLecture : JadwalCardUser}
        />
    );
}