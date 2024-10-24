import { config } from "dotenv";
import path from 'path';

config({ path: `.env.${process.env.NODE_ENV}` });

export const {
    PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    DB_HOST,
    DB_PORT,
    NODE_ENV
  } = <Record<string, string>>process.env;