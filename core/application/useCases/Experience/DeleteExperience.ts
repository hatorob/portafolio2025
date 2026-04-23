import { ExperienceRepository } from '../../../domain/repositories/ExperienceRepository';

export class DeleteExperience {
  constructor(private experienceRepository: ExperienceRepository) {}

  async execute(id: string) {
    return await this.experienceRepository.delete(id);
  }
}