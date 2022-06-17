import {Router} from "express";
import {ModuleRecord} from "../records/modules.record";

export const modulesRouter = Router();

modulesRouter
    .get('/', async (req, res) => {
        const modules = await ModuleRecord.getAllModules();
        res.json(modules);
    })

