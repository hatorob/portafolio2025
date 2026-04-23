import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateProfile } from '../../../core/application/useCases/Profile/CreateProfile';
import { ProfileAmplifyRepository } from '../../../core/infraestructure/repositories/ProfileAmplifyRepository';

const repository = new ProfileAmplifyRepository();
const createProfile = new CreateProfile(repository);

export const useCreateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => createProfile.execute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
  });
};