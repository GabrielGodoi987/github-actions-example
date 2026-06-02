import jwt, { SignOptions } from "jsonwebtoken";
import { JWT_REFRESH_TOKEN_SECRET } from "../consts/env-variables.consts";

export type JwtPayload = { userName: string; email: string;};

export class JwtService {
  static sign(
    payload: JwtPayload,
    SECRET_KEY: string,
    signOptions: SignOptions,
  ): string {
    return jwt.sign(payload, SECRET_KEY, signOptions);
  }

  static verify(token: string): JwtPayload & {sub: string; iat: number; } {
    return jwt.verify(token, JWT_REFRESH_TOKEN_SECRET) as JwtPayload & {sub: string; iat: number; };
  }
}
