import { UserEntity } from '../../domain/entities/user.entity'
import { UserNotFoundError } from '../../domain/domain-exceptions/user.exceptions'
import { EmailValueObject } from '../../domain/value-objects/email.value-object'
import { UserRepository } from '../../domain/repositories/user-repository'

export class UpdateUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(id: string, data: { name?: string; email?: string }): Promise<UserEntity> {
    const existing = await this.userRepo.findById(id)
    if (!existing) {
      throw new UserNotFoundError(id)
    }

    if (data.email) {
      new EmailValueObject(data.email)
    }

    return this.userRepo.update(id, data as { name: string; email: string })
  }
}
