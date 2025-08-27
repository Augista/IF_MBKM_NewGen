import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useDeleteSilabusMutation } from "@/hooks/useDeleteSilabusMutation";

export const silabusColumns = (
  onEdit: (data: any) => void
): ColumnDef<any>[] => [
  {
    accessorKey: "id",
    header: "No",
  },
  {
    accessorKey: "file_url", // tetap gunakan file_url agar sorting/searching tetap berfungsi
    header: "File Silabus",
    cell: ({ row }) => {
      const fileUrl = row.original.file_url;
      const linkUrl = row.original.link_url;
      const finalUrl = fileUrl || linkUrl;

      return finalUrl ? (
        <a
          href={finalUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="primary-default" className="flex gap-1 items-center">
            Lihat Silabus <ExternalLink className="w-4 h-4" />
          </Button>
        </a>
      ) : (
        <span className="italic text-gray-400">Tidak tersedia</span>
      );
    },
  },
  {
    accessorKey: "tanggal_upload",
    header: "Tanggal Upload",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const deleteMutation = useDeleteSilabusMutation();

      return (
        <div className="flex gap-2">
          <Button
            variant="primary-outline"
            onClick={() => onEdit(row.original)}
          >
            Edit
          </Button>
          <Button
            variant="primary-default"
            onClick={() =>
              deleteMutation.mutate({ id: row.original.id })
            }
          >
            Hapus
          </Button>
        </div>
      );
    },
  },
];
