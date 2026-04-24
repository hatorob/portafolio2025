import type { ExperienceRepository } from '../../../domain/repositories/ExperienceRepository';
import type { GetAllOptions } from '../../../domain/types/GetAllOptions';

export class GetExperiences {
  constructor(private experiencesRepository: ExperienceRepository) {}

  async execute(options?: GetAllOptions) {
    return await this.experiencesRepository.getAll(options);
  }
}