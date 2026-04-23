import { useQuery } from "@tanstack/react-query";
import { ExperienceAmplifyRepository } from "../../../core/infraestructure/repositories/ExperienceAmplifyRepository";
import { GetExperienceById } from '../../../core/application/useCases/Experience/GetExperienceById';

const repository = new ExperienceAmplifyRepository();
const getExperienceById = new GetExperienceById(repository);

export const useExperienceById = (id: string) => {
  return useQuery({
    queryKey: ["experience", id],
    queryFn: () => getExperienceById.execute(id),
    enabled: !!id, // 🔥 importante
  });
};