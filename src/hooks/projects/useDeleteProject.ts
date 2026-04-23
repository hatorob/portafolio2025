import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteProject } from "../../../core/application/useCases/Project/DeleteProject";
import { ProjectAmplifyRepository } from "../../../core/infraestructure/repositories/ProjectAmplifyRepository";

const repository = new ProjectAmplifyRepository();
const deleteProject = new DeleteProject(repository);

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProject.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};