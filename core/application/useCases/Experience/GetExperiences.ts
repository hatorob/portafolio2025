import { ExperienceRepository } from '../../../domain/repositories/ExperienceRepository';

export class GetExperiences {
  constructor(private experiencesRepository: ExperienceRepository) {}

  async execute() {
    return await this.experiencesRepository.getAll();
  }
}