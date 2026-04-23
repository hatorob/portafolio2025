import { BlogRepository } from '../../../domain/repositories/BlogRepository';

export class GetBlogs {
  constructor(private blogsRepository: BlogRepository) {}

  async execute() {
    return await this.blogsRepository.getAll();
  }
}