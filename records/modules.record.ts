import {v4 as uuid} from "uuid";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {Module} from "../types";

type ModuleEntity = [Module[], FieldPacket[]]

export class ModuleRecord implements Module {
    id: string;
    module: string;

    constructor(obj: Module) {
        this.module = obj.module.charAt(0).toUpperCase() + obj.module.slice(1).toLowerCase();
        this.id = obj.id
    }

    static async getAllModules(): Promise<Module[]> {
        const [results] = await pool.execute('SELECT * FROM `modules`') as ModuleEntity;

        return results.map(el => ({
            id: uuid(),
            module: el.module,
        }));
    }

    static async addModule(module: string) {
        await pool.execute('INSERT INTO `modules` (`module`)  VALUES(:module)', {
            module
        })
    }
}
