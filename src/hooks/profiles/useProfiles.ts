import { useQuery } from "@tanstack/react-query";
import { ProfileAmplifyRepository } from "../../../core/infraestructure/repositories/ProfileAmplifyRepository";
import { GetProfiles } from '../../../core/application/useCases/Profile/GetProfiles';

const repository = new ProfileAmplifyRepository();
const getProfiles = new GetProfiles(repository);

export const useProfiles = () => {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: () => getProfiles.execute(),
  });
};