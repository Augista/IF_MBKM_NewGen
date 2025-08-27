"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Silabus } from "@/types/silabus/silabus"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

type TableType = "Silabus" | "Transkrip";

export function documentColumnsTable(type: TableType): ColumnDef<Silabus>[] {
    return [
        {
            accessorKey: "id",
            header: "No",
        },
        {
            accessorKey: "file",
            header: "File",
            cell: ({ row }) => {
                const bukti = row.original.file;
                return (
                    <Button
                        variant="primary-default"
                        onClick={() => {
                            if (bukti) {
                                window.open(bukti, "_blank");
                            }
                        }}
                    >
                        {`Lihat ${type}`}
                        <ExternalLink />
                    </Button>
                );
            },
        },
        {
            accessorKey: "tanggalUpload",
            header: "Tanggal Upload",
        },
        {
            id: "actions",
            header: "Action",
            cell: ({ row }) => (
                <div className="flex gap-1 justify-center">
                    <Button variant="primary-outline">Edit</Button>
                    <Button variant="danger-default">Hapus</Button>
                </div>
            ),
        },
    ];
}
