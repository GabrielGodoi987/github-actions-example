import { SignOptions } from "jsonwebtoken";
import { UserRepository } from "../../domain/repositories/user-repository";
import {
  JWT_EXPIRES_IN,
  SECRET_KEY,
} from "../../infra/consts/env-variables.consts";
import { HashService } from "../../infra/services/hash.service";
import { JwtService } from "../../infra/services/jwt.service";

export class LoginUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(email: string, password: string): Promise<string> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValid = HashService.compare(password, user.getPassword());
    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    const signOptions: SignOptions = {
      expiresIn: JWT_EXPIRES_IN as SignOptions["expiresIn"],
      algorithm: "HS256",
      subject: user.getId(),
    };

    return JwtService.sign(
      { userId: user.getName(), email: user.getEmail() },
      SECRET_KEY,
      signOptions,
    );
  }
}

export class RefreshTokenUseCase {
  execute() {}
}
