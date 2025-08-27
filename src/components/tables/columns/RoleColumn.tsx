"use client"

import { ColumnDef } from "@tanstack/react-table"
import { UserRole } from "@/types/role/role"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";

export const userColumns = (router: ReturnType<typeof useRouter>): ColumnDef<UserRole>[] => [
    {
        accessorKey: "no",
        header: "No",
    },
    {
        accessorKey: "nama",
        header: "Nama",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        id: "actions",
        header: "Action",
        cell: ({ row }) => (
            <div className="flex gap-1 justify-center">
                <Button
                    size="icon"
                    variant="primary-outline"
                    onClick={() => router.push(`/dashboard/management/edit/${row.original.id}`)}
                >
                    <Pencil />
                </Button>
                <Button
                    size="icon"
                    variant="danger-default"
                >
                    <Trash2 />
                </Button>
            </div>
        ),
    },
]