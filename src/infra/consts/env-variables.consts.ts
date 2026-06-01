import { config } from 'dotenv';

config({
  debug: true,
});

export const SECRET_KEY = process.env.SECRET_KEY!;

export const DATABASE_URL = process.env.DATABASE_URL!;

export const PORT = process.env.PORT || 3000;