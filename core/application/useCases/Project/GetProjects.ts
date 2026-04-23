import type { ProjectRepository } from "../../../domain/repositories/ProjectRepository";

export class GetProjects {
  constructor(private projectRepository: ProjectRepository) {}

  async execute() {
    return await this.projectRepository.getAll();
  }
}