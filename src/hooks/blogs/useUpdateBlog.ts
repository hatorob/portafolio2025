import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BlogAmplifyRepository } from "../../../core/infraestructure/repositories/BlogAmplifyRepository";
import { UpdateBlog } from '../../../core/application/useCases/Blog/UpdateBlog';

const repository = new BlogAmplifyRepository();
const updateBlog = new UpdateBlog(repository);

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      updateBlog.execute(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};