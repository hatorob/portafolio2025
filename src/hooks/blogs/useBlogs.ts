import { useQuery } from "@tanstack/react-query";
import { BlogAmplifyRepository } from "../../../core/infraestructure/repositories/BlogAmplifyRepository";
import { GetBlogs } from '../../../core/application/useCases/Blog/GetBlogs';

const repository = new BlogAmplifyRepository();
const getBlogs = new GetBlogs(repository);

export const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: () => getBlogs.execute(),
  });
};