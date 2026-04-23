import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProfileAmplifyRepository } from "../../../core/infraestructure/repositories/ProfileAmplifyRepository";
import { DeleteProfile } from '../../../core/application/useCases/Profile/DeleteProfile';

const repository = new ProfileAmplifyRepository();
const deleteProfile = new DeleteProfile(repository);

export const useDeleteProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProfile.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};