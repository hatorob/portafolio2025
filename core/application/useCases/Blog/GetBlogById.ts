import { BlogRepository } from "../../../domain/repositories/BlogRepository";

export class GetBlogById {
  constructor(private blogRepository: BlogRepository) {}

  async execute(id: string) {
    return await this.blogRepository.getById(id);
  }
}