import { useQuery } from "@tanstack/react-query";
import { BlogAmplifyRepository } from "../../../core/infraestructure/repositories/BlogAmplifyRepository";
import { GetBlogById } from '../../../core/application/useCases/Blog/GetBlogById';

const repository = new BlogAmplifyRepository();
const getBlogById = new GetBlogById(repository);

export const useBlogById = (id: string) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogById.execute(id),
    enabled: !!id, // 🔥 importante
  });
};