import { useQuery } from "@tanstack/react-query";
import { BlogAmplifyRepository } from "../../../core/infraestructure/repositories/BlogAmplifyRepository";
import { GetBlogs } from '../../../core/application/useCases/Blog/GetBlogs';
import type { OptionsFilter } from "../../types/optionsFIlter";

const repository = new BlogAmplifyRepository();
const getBlogs = new GetBlogs(repository);

export const useBlogs = (options?: OptionsFilter) => {
  return useQuery({
    queryKey: ["blogs",options],
    queryFn: () => getBlogs.execute(options),
  });
};