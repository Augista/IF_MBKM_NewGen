"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Activity } from "@/types/activity/activity"
import { Button } from "@/components/ui/button"

export const columnsActivityLogbook: ColumnDef<Activity>[] = [
  {
    accessorKey: "pekan",
    header: "Pekan",
  },
  {
    accessorKey: "rentang_waktu",
    header: "Rentang Waktu",
  },
  {
    accessorKey: "durasi",
    header: "Durasi (Bulan)",
  },
  {
    accessorKey: "kegiatan",
    header: "Kegiatan",
  },
  {
    accessorKey: "cpmk_file_url",
    header: "CPMK",
    cell: ({ row }) => {
      const cpmkUrl = row.original.cpmk_file_url;
      return cpmkUrl ? (
        <Button
          variant="primary-outline"
          onClick={() => window.open(cpmkUrl, "_blank")}
        >
          Lihat CPMK
        </Button>
      ) : (
        <span className="text-gray-400 italic">Tidak ada file</span>
      );
    },
  },
  {
    accessorKey: "bukti_file_url",
    header: "Bukti",
    cell: ({ row }) => {
      const buktiUrl = row.original.bukti_file_url;
      return buktiUrl ? (
        <Button
          variant="primary-outline"
          onClick={() => window.open(buktiUrl, "_blank")}
        >
          Lihat Bukti
        </Button>
      ) : (
        <span className="text-gray-400 italic">Tidak ada file</span>
      );
    },
  },
];
