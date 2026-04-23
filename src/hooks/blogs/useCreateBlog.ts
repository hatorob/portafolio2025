import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BlogAmplifyRepository } from '../../../core/infraestructure/repositories/BlogAmplifyRepository';
import { CreateBlog } from '../../../core/application/useCases/Blog/CreateBlog';

const repository = new BlogAmplifyRepository();
const createBlog = new CreateBlog(repository);

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => createBlog.execute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};