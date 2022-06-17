import {Router} from "express";
import {TestRecord} from "../records/test.record";

export const testRouter = Router();

testRouter
    .get('/general', async (req, res) => {
        const test = await TestRecord.createGeneralTest();

        res.send(test);
    })

