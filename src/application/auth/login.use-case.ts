import { UserRepository } from '../../domain/repositories/user-repository'
import { HashService } from '../../infra/services/hash.service'
import { JwtService } from '../../infra/services/jwt.service'

export class LoginUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(email: string, password: string): Promise<string> {
    const user = await this.userRepo.findByEmail(email)
    if (!user) {
      throw new Error('Invalid credentials')
    }

    const isValid = HashService.compare(password, user.getPassword())
    if (!isValid) {
      throw new Error('Invalid credentials')
    }

    return JwtService.sign({ userId: user.getId(), email: user.getEmail() })
  }
}
