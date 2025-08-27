import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteTranskripPayload {
  id: number;
}

export function useDeleteTranskripMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: DeleteTranskripPayload) => {
      const response = await fetch(`/api/transkrip/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Gagal menghapus transkrip");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transkrip"] });
    },
    onError: (error: any) => {
      console.error("Delete failed:", error.message);
      alert("Gagal menghapus transkrip");
    },
  });
}
