import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { usersSchema } from "../../../db/schema";
import { UserEntity } from "../../../domain/entities/user.entity";
import { UserRepository } from "../../../domain/repositories/user-repository";
import { UserMapper } from "../mappers/user.mapper";

export class DrizzleUserRepository implements UserRepository {
  async create(user: UserEntity): Promise<UserEntity> {
    const [row] = await db
      .insert(usersSchema)
      .values({
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
        password: user.getPassword(),
        createdAt: user.getCreatedAt(),
        updatedAt: user.getUpdatedAt(),
      })
      .returning();

    return UserMapper.toEntity(row);
  }

  async findById(id: string): Promise<UserEntity | null> {
    const [row] = await db
      .select()
      .from(usersSchema)
      .where(eq(usersSchema.id, id));
    return row ? UserMapper.toEntity(row) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const [row] = await db
      .select()
      .from(usersSchema)
      .where(eq(usersSchema.email, email));
    return row ? UserMapper.toEntity(row) : null;
  }

  async findAll(): Promise<UserEntity[]> {
    const rows = await db.select().from(usersSchema);
    return rows.map((row) => UserMapper.toEntity(row));
  }

  async update(
    id: string,
    data: { name?: string; email?: string },
  ): Promise<UserEntity> {
    const [row] = await db
      .update(usersSchema)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(usersSchema.id, id))
      .returning();

    return UserMapper.toEntity(row);
  }

  async delete(id: string): Promise<void> {
    await db.delete(usersSchema).where(eq(usersSchema.id, id));
  }
}
