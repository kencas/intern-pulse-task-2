import { DataSource } from "typeorm";
import { Product } from "../api/components/products/product.model";
import { env } from "./global";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from "./db.config";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: parseInt(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: true,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      }
    },
    logging: true,
    entities: [Product],
    subscribers: [],
    cache: true,
    "migrations": [
        "src/migration/**/*.ts"
     ],
})