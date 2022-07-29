import { DataSource } from "typeorm";
import {Note} from "./entity/Note";
require('dotenv').config()
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "postgres",
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [Note],
    subscribers: [],
    migrations: [],
})