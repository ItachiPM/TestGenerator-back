import {Router} from "express";
import {QuestionRecord} from "../records/question.record";

export const questionRouter = Router();

questionRouter
    .get('/questions', async (req, res) => {
        const allQuestion = await QuestionRecord.getAllQuestions();
        res.json(allQuestion);
    })
    .get('/questions/:module', async (req, res) => {
        console.log(req.params.module)
        const allQuestion = await QuestionRecord.getAllQuestionsFromModule(req.params.module)
        res.json(allQuestion);
    })
    .delete('/', async (req, res) => {
        await QuestionRecord.delete(req.body.id);
    })
    .get('/modules', async (req, res) => {
        const modules = await QuestionRecord.getAllModules();

        res.json(modules);
    })
    .post('/', async (req, res) =>{

})
