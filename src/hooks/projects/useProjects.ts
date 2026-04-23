import { useQuery } from "@tanstack/react-query";
import { GetProjects } from "../../../core/application/useCases/Project/GetProjects";
import { ProjectAmplifyRepository } from "../../../core/infraestructure/repositories/ProjectAmplifyRepository";

const repository = new ProjectAmplifyRepository();
const getProjects = new GetProjects(repository);

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects.execute(),
  });
};