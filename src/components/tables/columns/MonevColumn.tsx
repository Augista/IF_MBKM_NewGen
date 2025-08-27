"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { Monev } from "@/types/mbkm/monev";

export const monevColumns = (router: ReturnType<typeof useRouter>): ColumnDef<Monev>[] => [
    {
        accessorKey: "id",
        header: "No",
    },
    {
        accessorKey: "nama",
        header: "Nama",
    },
    {
        accessorKey: "angkatan",
        header: "Angkatan",
    },
    {
        accessorKey: "tipeMbkm",
        header: "Jenis MBKM",
    },
    {
        accessorKey: "pemonev",
        header: "Pemonev",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "monev",
        header: "Monev ke",
    },
    {
        id: "actions",
        header: "Action",
        cell: ({ row }) => (
            <Button
                variant="primary-outline"
                onClick={() => router.push(`/mbkm/grading/${row.original.id}`)}
            >
                Beri Nilai
            </Button>
        ),
    },
]