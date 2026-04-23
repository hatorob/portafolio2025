import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BlogAmplifyRepository } from "../../../core/infraestructure/repositories/BlogAmplifyRepository";
import { DeleteBlog } from '../../../core/application/useCases/Blog/DeleteBlog';

const repository = new BlogAmplifyRepository();
const deleteBlog = new DeleteBlog(repository);

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBlog.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
  });
};