import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProfileAmplifyRepository } from "../../../core/infraestructure/repositories/ProfileAmplifyRepository";
import { UpdateProfile } from '../../../core/application/useCases/Profile/UpdateProfile';

const repository = new ProfileAmplifyRepository();
const updateProfile = new UpdateProfile(repository);

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      updateProfile.execute(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
  });
};