'use client'
import { useEffect, useState } from "react";
import EmptyCard from "@/components/EmptyCard";
import SilabusCard from "./components/SilabusCard";
import TableWrapper from "@/components/tables/TableWrapper";

export default function SilabusPage() {
    const [mbkmData, setMbkmData] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const mbkm = [
                    {
                        id: "1",
                        nama: "MBKM Kampus Mengajar",
                        status: "Diterima",
                    },
                ];

                setMbkmData(mbkm);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) return <div>Loading...</div>;

    if (mbkmData.length === 0) {
        return <EmptyCard />;
    }

    return <TableWrapper className="min-h-screen" CardComponent={SilabusCard} />;;
}