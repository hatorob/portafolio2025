import { useQuery } from "@tanstack/react-query";
import { ExperienceAmplifyRepository } from "../../../core/infraestructure/repositories/ExperienceAmplifyRepository";
import { GetExperiences } from '../../../core/application/useCases/Experience/GetExperiences';

const repository = new ExperienceAmplifyRepository();
const getExperiences = new GetExperiences(repository);

export const useExperiences = () => {
  return useQuery({
    queryKey: ["experiences"],
    queryFn: () => getExperiences.execute(),
  });
};