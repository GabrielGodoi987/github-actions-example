import { postsSchema } from "../../../db/schema";
import { PostEntity } from "../../../domain/entities/post.entity";


export class PostMapper {
  static toEntity(postSchema: typeof postsSchema.$inferSelect): PostEntity{
    const postEntity = new PostEntity(
      postSchema.title,
      postSchema.content,
      postSchema.userId,
      postSchema.createdAt,
      postSchema.updatedAt
    );

    postEntity.setId(postSchema.id);

    return postEntity;
  }

  async toPersistence(postEntity: PostEntity): Promise<typeof postsSchema.$inferInsert> {
    return {
      id: postEntity.getId(),
      title: postEntity.getTitle(),
      content: postEntity.getContent(),
      userId: postEntity.getUserId(),
      createdAt: postEntity.getCreatedAt(),
      updatedAt: postEntity.getUpdatedAt(),
    };
  }
}