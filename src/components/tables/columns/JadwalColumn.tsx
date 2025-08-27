import { ColumnDef } from "@tanstack/react-table"
import { JadwalLecture, JadwalUser } from "@/types/mbkm/jadwal"
import { Button } from "@/components/ui/button"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { id as idLocale } from "date-fns/locale"

export const jadwalLectureColumns = (
  router: ReturnType<typeof useRouter>,
  onDelete: (id: string) => void
): ColumnDef<JadwalLecture>[] => [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "tanggal",
    header: "Tanggal",
    cell: ({ getValue }) =>
      format(new Date(getValue() as string), "dd MMMM yyyy", { locale: idLocale }),
  },
  {
    accessorKey: "tempat",
    header: "Tempat",
  },
  {
    accessorKey: "waktu",
    header: "Waktu",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex gap-1 justify-center">
        <Button
          size="icon"
          variant="primary-default"
          onClick={() => router.push(`/jadwal/detail/${row.original.id}`)}
        >
          <Eye className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="primary-outline"
          onClick={() => router.push(`/jadwal/edit/${row.original.id}`)}
        >
          <Pencil className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="danger-default"
          onClick={() => onDelete(row.original.id)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  },
]

export const jadwalUserColumns = (
  onBook: (jadwalId: string, waktu: string[]) => void
): ColumnDef<JadwalUser>[] => [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "dosen_nama",
    header: "Dosen",
    cell: ({ row }) => row.original.dosen_id?.nama || "-",
  },
  {
    accessorKey: "tanggal",
    header: "Tanggal",
    cell: ({ getValue }) =>
      format(new Date(getValue() as string), "dd MMM yyyy", { locale: idLocale }),
  },
  {
    accessorKey: "tempat",
    header: "Tempat",
  },
  {
    accessorKey: "waktu",
    header: "Waktu",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex gap-1 justify-center">
        <Button
          variant="primary-default"
          onClick={() => {
            const waktuList = Array.isArray(row.original.waktu)
              ? row.original.waktu
              : typeof row.original.waktu === "string"
              ? JSON.parse(row.original.waktu)
              : []
            onBook(row.original.id, waktuList)
          }}
        >
          Book
        </Button>
      </div>
    ),
  },
]
