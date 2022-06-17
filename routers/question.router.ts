import {Router} from "express";
import {QuestionRecord} from "../records/question.record";

export const questionRouter = Router();

questionRouter
    .get('/', async (req, res) => {
        const allQuestion = await QuestionRecord.getQuestionAndAnswer();
        res.json(allQuestion);
    })
    .get('/:module', async (req, res) => {
        const questionFromModule = await QuestionRecord.getQuestionAndAnswerFromModule(req.params.module)
        res.json(questionFromModule);
    })
    .post('/add', async (req, res) =>{
        console.log(req.body)
        const question = new QuestionRecord(req.body)
        const add = await question.insert()
        res.status(201).json({
            module: question.module,
            isNewModule: add,
        })
    })
    .delete('/', async (req, res) => {
        await QuestionRecord.delete(req.body.id);
    })


