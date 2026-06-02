import { SignOptions } from "jsonwebtoken";
import { db } from "../../../src/db";
import { JWT_EXPIRES_IN, JWT_REFRESH_TOKEN_SECRET } from "../../../src/infra/consts/env-variables.consts";
import { JwtService } from "../../../src/infra/services/jwt.service";
import { bootStrapApplication } from "../../../src/infra/webserver/server";
import { context } from "../../lib/context";
import {
  createUserFactory,
  deleteUsersFactory,
  getUserByEmailFactory,
} from "../factories/user.factory";

describe("AuthController - e2e test", () => {
  beforeAll(async () => {
    await bootStrapApplication();
    await new Promise((r) => setTimeout(r, 200));
  });

  afterAll(async () => {
    await db.$client.end();
  });

  beforeEach(async () => {
    await createUserFactory();
  });

  afterEach(async () => {
    await deleteUsersFactory();
  });

  describe("POST /auth/login", () => {
    context("when credentials are valid", () => {
      it.only("returns 200 and a token", async () => {
        const res = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: "user1@example.com", password: "password1" }),
        });

        expect(res.status).toBe(200);
        console.log(await res.json());
        const body = await res.json();
        expect(body).toHaveProperty("token");
        //expect(typeof body.token).toBe("string");
      });
    });
    context("when credentials are invalid", () => {
      it("returns 400 when missing fields", async () => {
        const res = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });

        expect(res.status).toBe(400);
        const body = await res.json() as { error: string };
        expect(body).toHaveProperty("error", "Email and password are required");
      });

      it("returns 500 for wrong password", async () => {
        const res = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: "user1@example.com", password: "badpassword" }),
        });

        expect(res.status).toBe(500);
        const body = await res.json() as { error: string };
        expect(body).toHaveProperty("error", "Invalid credentials");
      });
    });
  });

  describe("POST /auth/refresh", () => {
    context("when refresh token is valid", () => {
      it("returns 200 and a new token", async () => {
        const userRow = await getUserByEmailFactory("user1@example.com");

        const token = JwtService.sign(
          { userName: userRow.name, email: userRow.email },
          JWT_REFRESH_TOKEN_SECRET,
          { expiresIn: String(JWT_EXPIRES_IN) as SignOptions['expiresIn'], algorithm: "HS256", subject: userRow.id },
        );

        const res = await fetch("http://localhost:3000/auth/refresh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        expect(res.status).toBe(200);
        const body = await res.json() as { token: string };
        expect(body).toHaveProperty("token");
        expect(typeof body.token).toBe("string");
      });
    });
    context("when refresh token is invalid", () => {
      it("returns 500 for invalid token", async () => {
        const res = await fetch("http://localhost:3000/auth/refresh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: "invalid.token.here" }),
        });

        expect(res.status).toBe(500);
        const body = await res.json() as { error: string };
        expect(body).toHaveProperty("error", "Invalid token");
      });
    });
    context("when refresh token is expired", () => {
      it("returns 500 for expired token", async () => {
        const userRow = await getUserByEmailFactory("user1@example.com");

        const token = JwtService.sign(
          { userName: userRow.name, email: userRow.email },
          JWT_REFRESH_TOKEN_SECRET,
          { expiresIn: "1ms", algorithm: "HS256", subject: userRow.id },
        );

        await new Promise((r) => setTimeout(r, 50));

        const res = await fetch("http://localhost:3000/auth/refresh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        expect(res.status).toBe(500);
        const body = await res.json() as { error: string };
        expect(body).toHaveProperty("error", "Invalid token");
      });
    });
  });
});
