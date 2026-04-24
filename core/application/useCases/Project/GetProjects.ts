import type { ProjectRepository } from "../../../domain/repositories/ProjectRepository";
import type { GetAllOptions } from "../../../domain/types/GetAllOptions";

export class GetProjects {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(options?: GetAllOptions) {
    return await this.projectRepository.getAll(options);
  }
}