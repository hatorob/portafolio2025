import { useQuery } from "@tanstack/react-query";
import { ProfileAmplifyRepository } from "../../../core/infraestructure/repositories/ProfileAmplifyRepository";
import { GetProfileById } from '../../../core/application/useCases/Profile/GetProfileById';

const repository = new ProfileAmplifyRepository();
const getProfileById = new GetProfileById(repository);

export const useProfileById = (id: string) => {
  return useQuery({
    queryKey: ["profile", id],
    queryFn: () => getProfileById.execute(id),
    enabled: !!id, // 🔥 importante
  });
};