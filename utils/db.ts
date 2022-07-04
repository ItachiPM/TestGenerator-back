import {createPool} from "mysql2/promise";
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname+'/.env' });

export const pool = createPool({
    host: process.env.DB_HOST,
    user: 'root',
    database: 'test_generator',
    namedPlaceholders: true,
    decimalNumbers: true,
})
