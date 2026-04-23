import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ExperienceAmplifyRepository } from "../../../core/infraestructure/repositories/ExperienceAmplifyRepository";
import { UpdateExperience } from '../../../core/application/useCases/Experience/UpdateExperience';

const repository = new ExperienceAmplifyRepository();
const updateExperience = new UpdateExperience(repository);

export const useUpdateExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      updateExperience.execute(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    },
  });
};