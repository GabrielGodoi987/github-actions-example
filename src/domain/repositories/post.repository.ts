import { PostEntity } from '../entities/post.entity'

export interface PostRepository {
  create(post: PostEntity): Promise<PostEntity>
  findById(id: string): Promise<PostEntity | null>
  findAll(): Promise<PostEntity[]>
  findByUserId(userId: string): Promise<PostEntity[]>
  update(id: string, data: { title?: string; content?: string }): Promise<PostEntity>
  delete(id: string): Promise<void>
}
