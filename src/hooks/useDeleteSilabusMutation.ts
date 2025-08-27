import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteSilabusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const res = await fetch(`/api/silabus/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Gagal menghapus silabus");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["silabus"] });
    },
  });
}
