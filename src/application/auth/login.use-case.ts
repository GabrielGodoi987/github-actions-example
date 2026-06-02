import { SignOptions } from "jsonwebtoken";
import { UserRepository } from "../../domain/repositories/user-repository";
import {
  JWT_ACCESS_TOKEN_SECRET,
  JWT_EXPIRES_IN,
  JWT_REFRESH_TOKEN_SECRET,
} from "../../infra/consts/env-variables.consts";
import { HashService } from "../../infra/services/hash.service";
import { JwtService } from "../../infra/services/jwt.service";

export class LoginUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }> {
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

    const accessToken = JwtService.sign(
      { userName: user.getName(), email: user.getEmail() },
      JWT_ACCESS_TOKEN_SECRET,
      signOptions,
    );

    const refreshToken = JwtService.sign(
      { userName: user.getName(), email: user.getEmail() },
      JWT_REFRESH_TOKEN_SECRET,
      { ...signOptions, expiresIn: "7d" },
    );

    return { accessToken, refreshToken };
  }
}

export class RefreshTokenUseCase {
  constructor(private readonly userRepository: UserRepository){}

  async execute(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    try { 
      const payload = JwtService.verify(refreshToken);
      
      console.log(payload);

      const user = await this.verifyIfUserExists(payload.email);

      const signOptions: SignOptions = {
        expiresIn: JWT_EXPIRES_IN as SignOptions["expiresIn"],
        algorithm: "HS256",
        subject: payload.sub,
      };

      const newAccessToken = JwtService.sign(
        { userName: user.getName(), email: payload.email },
        JWT_ACCESS_TOKEN_SECRET,
        signOptions,
      );

      const newRefreshToken = JwtService.sign(
        {
          userName: user.getName(), email: payload.email,
        },
        JWT_REFRESH_TOKEN_SECRET,
        signOptions,
      );

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }catch (err) {
      throw new Error("Invalid token");
    }
  }

  private async verifyIfUserExists(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  private verifyAndValidateRefreshToken(refreshToken: string){}
}
