import { PostEntity } from '../../domain/entities/post.entity'
import { PostNotFoundError } from '../../domain/domain-exceptions/posts.exceptions'
import { PostRepository } from '../../domain/repositories/post.repository'

export class UpdatePostUseCase {
  constructor(private postRepo: PostRepository) {}

  async execute(id: string, data: { title?: string; content?: string }): Promise<PostEntity> {
    const existing = await this.postRepo.findById(id)
    if (!existing) {
      throw new PostNotFoundError(id)
    }

    return this.postRepo.update(id, data as { title: string; content: string })
  }
}
