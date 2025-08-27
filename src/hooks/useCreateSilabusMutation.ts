import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApiMutation } from "./useApi"

export type CreateSilabusRequest = {
  silabus: string
  link?: string
  file?: File;
}

export default function useCreateSilabusMutation() {
  const queryClient = useQueryClient()
  const { mutate: apiMutate, loading } = useApiMutation()

  const { mutate, mutateAsync, isPending, data, isError } = useMutation({
    mutationFn: async (data: CreateSilabusRequest) => {
      const formData = new FormData();
      if (data.link) {
          formData.append("link", data.link); 
        }
      if (data.file) {
          formData.append("file", data.file);
        }
      

      const res = await apiMutate("/api/silabus", {
        method: "POST",
        body: formData,
      });

      return res;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["silabus"] })
    },
  })

  return { mutate, mutateAsync, isPending: isPending || loading, data, isError }
}
