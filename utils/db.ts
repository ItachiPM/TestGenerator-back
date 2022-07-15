import {createPool} from "mysql2/promise";
import {config} from "../congifData/configData";

export const pool = createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE,
    namedPlaceholders: true,
    decimalNumbers: true,
})
