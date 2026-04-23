import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateProject } from "../../../core/application/useCases/Project/UpdateProject";
import { ProjectAmplifyRepository } from "../../../core/infraestructure/repositories/ProjectAmplifyRepository";

const repository = new ProjectAmplifyRepository();
const updateProject = new UpdateProject(repository);

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      updateProject.execute(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};