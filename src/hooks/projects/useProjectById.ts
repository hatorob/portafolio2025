import { useQuery } from "@tanstack/react-query";
import { GetProjectById } from "../../../core/application/useCases/Project/GetProjectById";
import { ProjectAmplifyRepository } from "../../../core/infraestructure/repositories/ProjectAmplifyRepository";

const repository = new ProjectAmplifyRepository();
const getProjectById = new GetProjectById(repository);

export const useProjectById = (id: string) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectById.execute(id),
    enabled: !!id, // 🔥 importante
  });
};