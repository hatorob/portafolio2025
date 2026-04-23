import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateExperience } from '../../../core/application/useCases/Experience/CreateExperience';
import { ExperienceAmplifyRepository } from '../../../core/infraestructure/repositories/ExperienceAmplifyRepository';

const repository = new ExperienceAmplifyRepository();
const createExperience = new CreateExperience(repository);

export const useCreateExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => createExperience.execute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    },
  });
};