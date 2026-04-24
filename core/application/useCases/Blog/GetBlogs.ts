import type { BlogRepository } from '../../../domain/repositories/BlogRepository';
import type { GetAllOptions } from '../../../domain/types/GetAllOptions';

export class GetBlogs {
  constructor(private blogsRepository: BlogRepository) {}

  async execute(options?: GetAllOptions) {
    return await this.blogsRepository.getAll(options);
  }
}