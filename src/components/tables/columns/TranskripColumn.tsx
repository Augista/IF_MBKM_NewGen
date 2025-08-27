import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useDeleteTranskripMutation } from "@/hooks/useDeleteTranskripMutation";

export const transkripColumns = (
  onEdit: (data: any) => void
): ColumnDef<any>[] => [
  {
  accessorKey: "file_url",
  header: "File Transkrip",
  cell: ({ row }) => (
    <a
      href={row.original.file_url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button variant="primary-default" className="flex gap-1 items-center">
        Lihat Transkrip <ExternalLink className="w-4 h-4" />
      </Button>
    </a>
  ),
},

  {
    accessorKey: "tanggal_upload",
    header: "Tanggal Upload",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const deleteMutation = useDeleteTranskripMutation();

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
