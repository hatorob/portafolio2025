import { useQuery } from "@tanstack/react-query";
import { GetProjects } from "../../../core/application/useCases/Project/GetProjects";
import { ProjectAmplifyRepository } from "../../../core/infraestructure/repositories/ProjectAmplifyRepository";
import type { OptionsFilter } from "../../types/optionsFIlter";

const repository = new ProjectAmplifyRepository();
const getProjects = new GetProjects(repository);

export const useProjects = (options?: OptionsFilter) => {
  return useQuery({
    queryKey: ["projects", options],
    queryFn: () => getProjects.execute(options),
  });
};