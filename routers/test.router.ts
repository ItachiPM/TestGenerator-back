import {Router} from "express";
import {TestRecord} from "../records/test.record";

export const testRouter = Router();

testRouter
    .get('/general', async (req, res) => {
        const test = await TestRecord.createGeneralTest();
        res.json(test);
    })
    .get('/module/:moduleName/:questionsCount', async (req, res) => {
        const {moduleName, questionsCount} = req.params
        const test = await TestRecord.createModuleTest(moduleName, Number(questionsCount));

        res.json(test);
    })

