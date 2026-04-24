import { useQuery } from "@tanstack/react-query";
import { ExperienceAmplifyRepository } from "../../../core/infraestructure/repositories/ExperienceAmplifyRepository";
import { GetExperiences } from '../../../core/application/useCases/Experience/GetExperiences';
import type { OptionsFilter } from "../../types/optionsFIlter";

const repository = new ExperienceAmplifyRepository();
const getExperiences = new GetExperiences(repository);

export const useExperiences = (options?: OptionsFilter) => {
  return useQuery({
    queryKey: ["experiences", options],
    queryFn: () => getExperiences.execute(options),
  });
};