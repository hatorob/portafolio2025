import { ExperienceRepository } from '../../../domain/repositories/ExperienceRepository';

export class CreateExperience {
  constructor(private experienceRepository: ExperienceRepository) {}

  async execute(experience: any) {
    return await this.experienceRepository.create(experience);
  }
}