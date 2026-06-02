import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { postsSchema } from "../../../db/schema";
import { PostEntity } from "../../../domain/entities/post.entity";
import { PostRepository } from "../../../domain/repositories/post.repository";
import { PostMapper } from "../mappers/post.mapper";

export class DrizzlePostRepository implements PostRepository {
  async create(post: PostEntity): Promise<PostEntity> {
    const [row] = await db
      .insert(postsSchema)
      .values({
        id: post.getId(),
        title: post.getTitle(),
        content: post.getContent(),
        userId: post.getUserId(),
        createdAt: post.getCreatedAt(),
        updatedAt: post.getUpdatedAt(),
      })
      .returning();

    return PostMapper.toEntity(row);
  }

  async findById(id: string): Promise<PostEntity | null> {
    const [row] = await db
      .select()
      .from(postsSchema)
      .where(eq(postsSchema.id, id));
    return row ? PostMapper.toEntity(row) : null;
  }

  async findAll(): Promise<PostEntity[]> {
    const rows = await db.select().from(postsSchema);
    return rows.map((row) => PostMapper.toEntity(row));
  }

  async findByUserId(userId: string): Promise<PostEntity[]> {
    const rows = await db
      .select()
      .from(postsSchema)
      .where(eq(postsSchema.userId, userId));
    return rows.map((row) => PostMapper.toEntity(row));
  }

  async update(
    id: string,
    data: { title?: string; content?: string },
  ): Promise<PostEntity> {
    const [row] = await db
      .update(postsSchema)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(postsSchema.id, id))
      .returning();

    return PostMapper.toEntity(row);
  }

  async delete(id: string): Promise<void> {
    await db.delete(postsSchema).where(eq(postsSchema.id, id));
  }
}
