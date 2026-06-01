import jwt, { SignOptions } from "jsonwebtoken";
import { SECRET_KEY } from "../consts/env-variables.consts";

export type JwtPayload = { userId: string; email: string };

export class JwtService {
  static sign(
    payload: JwtPayload,
    SECRET_KEY: string,
    signOptions: SignOptions,
  ): string {
    return jwt.sign(payload, SECRET_KEY, signOptions);
  }

  static verify(token: string): JwtPayload {
    return jwt.verify(token, SECRET_KEY) as JwtPayload;
  }
}
