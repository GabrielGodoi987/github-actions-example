import { PostEntity } from '../../domain/entities/post.entity'
import { PostNotFoundError } from '../../domain/domain-exceptions/posts.exceptions'
import { PostRepository } from '../../domain/repositories/post.repository'

export class FindOnePostUseCase {
  constructor(private postRepo: PostRepository) {}

  async execute(id: string): Promise<PostEntity> {
    const post = await this.postRepo.findById(id)
    if (!post) {
      throw new PostNotFoundError(id)
    }
    return post
  }
}
