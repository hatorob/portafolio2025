import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateProject } from "../../../core/application/useCases/Project/CreateProject";
import { ProjectAmplifyRepository } from "../../../core/infraestructure/repositories/ProjectAmplifyRepository";

const repository = new ProjectAmplifyRepository();
const createProject = new CreateProject(repository);

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => createProject.execute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};