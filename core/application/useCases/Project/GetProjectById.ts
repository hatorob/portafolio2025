import type { ProjectRepository } from "../../../domain/repositories/ProjectRepository";

export class GetProjectById {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(id: string) {
    return await this.projectRepository.getById(id);
  }
}