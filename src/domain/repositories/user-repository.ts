import { UserEntity } from '../entities/user.entity'

export interface UserRepository {
  create(user: UserEntity): Promise<UserEntity>
  findById(id: string): Promise<UserEntity | null>
  findByEmail(email: string): Promise<UserEntity | null>
  findAll(): Promise<UserEntity[]>
  update(id: string, data: { name?: string; email?: string }): Promise<UserEntity>
  delete(id: string): Promise<void>
}
