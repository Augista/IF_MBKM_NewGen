"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export type MBKM = {
  id: string
  nama: string
  angkatan: string
  tipe_mbkm: string
  status: string
}

export const listmbkmColumns = (router: ReturnType<typeof useRouter>): ColumnDef<MBKM>[] => [
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "angkatan",
    header: "Angkatan",
  },
  {
    accessorKey: "tipe_mbkm",
    header: "Jenis MBKM",
  },
  {
    accessorKey: "status",
    header: "Status",
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
