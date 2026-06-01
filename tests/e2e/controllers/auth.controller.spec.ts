import { db } from "../../../src/db";
import { context } from "../../lib/context";
import {
  createUserFactory,
  deleteUsersFactory,
} from "../factories/user.factory";

describe("AuthController - e2e test", () => {
  beforeAll(async () => {
    await db.$client.connect();
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
    context("when credentials are valid", () => {});
    context("when credentials are invalid", () => {});
  });

  describe("POST /auth/refresh", () => {
    context("when refresh token is valid", () => {});
    context("when refresh token is invalid", () => {});
    context("when refresh token is expired", () => {});
  });
});
