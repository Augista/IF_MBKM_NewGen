import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "./useApi";

export type CreateTranskripRequest = {
  transkrip: string;
  file?: File;
};

export default function useCreateTranskripMutation() {
  const queryClient = useQueryClient();
  const { mutate: apiMutate, loading } = useApiMutation(); 

  const mutation = useMutation({
    mutationFn: async (data: CreateTranskripRequest) => {
      const formData = new FormData();
      formData.append("transkrip", data.transkrip);
      if (data.file) {
        formData.append("file", data.file);
      }

      const res = await apiMutate("/api/transkrip", {
        method: "POST",
        body: formData,
      });

      return res;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transkrip"] });
    },

    onError: (error: any) => {
      console.error("Upload failed:", error);
      alert("Gagal menyimpan transkrip");
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending || loading,
    data: mutation.data,
    isError: mutation.isError,
  };
}
