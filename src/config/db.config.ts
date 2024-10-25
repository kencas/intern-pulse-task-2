import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV}` });

export const {
    PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    DB_HOST,
    DB_PORT,
    NODE_ENV,
    MONGO_URI,
    JWT_SECRET
  } = <Record<string, string>>process.env;