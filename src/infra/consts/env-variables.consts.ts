export const API_TOKEN = process.env.API_TOKEN!;

export const PORT = process.env.PORT || 3000;

// database
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PORT = process.env.DB_PORT || "5432";
export const DB_USER = process.env.DB_USER || "postgres";
export const DB_PASSWORD = process.env.DB_PASSWORD || "postgres";
export const DB_NAME = process.env.DB_NAME || "simple_app";
export const DATABASE_URL =
  process.env.DATABASE_URL! ||
  `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

// JWT
export const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET || "your_jwt_secret_key";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1H";
export const JWT_REFRESH_TOKEN_SECRET =
  process.env.JWT_REFRESH_TOKEN_SECRET || "your_jwt_refresh_secret_key";
export const JWT_REFRESH_EXPIRES_IN =
  process.env.JWT_REFRESH_EXPIRES_IN || "10H";
