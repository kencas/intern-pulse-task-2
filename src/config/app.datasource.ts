import { DataSource } from "typeorm";
import { env } from "./global";
import { Book } from "../api/components/books/book.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT),
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    synchronize: true,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      }
    },
    logging: false,
    entities: [Book],
    subscribers: [],
    cache: true,
    "migrations": [
        "src/migration/**/*.ts"
     ],
})