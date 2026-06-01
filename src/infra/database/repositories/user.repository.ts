import { eq } from 'drizzle-orm'
import { db } from '../../../db'
import { users } from '../../../db/schema'
import { UserEntity } from '../../../domain/entities/user.entity'
import { UserRepository } from '../../../domain/repositories/user-repository'

export class DrizzleUserRepository implements UserRepository {
  async create(user: UserEntity): Promise<UserEntity> {
    const [row] = await db.insert(users).values({
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      password: user.getPassword(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
    }).returning()

    return this.toEntity(row)
  }

  async findById(id: string): Promise<UserEntity | null> {
    const [row] = await db.select().from(users).where(eq(users.id, id))
    return row ? this.toEntity(row) : null
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const [row] = await db.select().from(users).where(eq(users.email, email))
    return row ? this.toEntity(row) : null
  }

  async findAll(): Promise<UserEntity[]> {
    const rows = await db.select().from(users)
    return rows.map(row => this.toEntity(row))
  }

  async update(id: string, data: { name?: string; email?: string }): Promise<UserEntity> {
    const [row] = await db.update(users).set({
      ...data,
      updatedAt: new Date(),
    }).where(eq(users.id, id)).returning()

    return this.toEntity(row)
  }

  async delete(id: string): Promise<void> {
    await db.delete(users).where(eq(users.id, id))
  }

  private toEntity(row: typeof users.$inferSelect): UserEntity {
    const user = new UserEntity(row.name, row.email, row.password, row.createdAt, row.updatedAt)
    user.setId(row.id)
    return user
  }
}
