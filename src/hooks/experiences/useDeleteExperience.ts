import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ExperienceAmplifyRepository } from "../../../core/infraestructure/repositories/ExperienceAmplifyRepository";
import { DeleteExperience } from '../../../core/application/useCases/Experience/DeleteExperience';

const repository = new ExperienceAmplifyRepository();
const deleteExperience = new DeleteExperience(repository);

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteExperience.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experience"] });
    },
  });
};