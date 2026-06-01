import { UserEntity } from '../../domain/entities/user.entity'
import { UserAlreadyExistsError } from '../../domain/domain-exceptions/user.exceptions'
import { PasswordValueObject } from '../../domain/value-objects/password.value-object'
import { UserRepository } from '../../domain/repositories/user-repository'
import { HashService } from '../../infra/services/hash.service'

export class CreateUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(name: string, email: string, password: string): Promise<UserEntity> {
    new PasswordValueObject(password)

    const existing = await this.userRepo.findByEmail(email)
    if (existing) {
      throw new UserAlreadyExistsError(email)
    }

    const hashedPassword = HashService.hash(password)
    const now = new Date()
    const user = new UserEntity(name, email, hashedPassword, now, now)

    return this.userRepo.create(user)
  }
}
