import {Router} from "express";
import {QuestionRecord} from "../records/question.record";
import {ValidationError} from "../utils/handleError";

export const questionRouter = Router();

questionRouter
    .get('/', async (req, res) => {
        const allQuestion = await QuestionRecord.getQuestionAndAnswer();
        res.json(allQuestion);
    })
    .post('/add', async (req, res) => {
        const question = new QuestionRecord(req.body)
        const add = await question.insert()
        res.status(201).json({
            module: question.module,
            isNewModule: add,
        })
    })
    .get('/search/:content', async (req, res) => {
        const searchingQuestion = await QuestionRecord.search(req.params.content)
        res.json(searchingQuestion)
    })
    .get('/search', async (req, res) => {
        const searchingQuestion = await QuestionRecord.searchAll()
        res.json(searchingQuestion)
    })
    .get('/module/:module', async (req, res) => {
        const questionFromModule = await QuestionRecord.getQuestionAndAnswerFromModule(req.params.module)
        res.json(questionFromModule);
    })
    .get('/getOneQuestion/:id', async (req, res) => {
        const singleQuestion = await QuestionRecord.getOne(req.params.id)
        res.json(singleQuestion);
    })
    .put('/', async (req, res) => {
        const updateQuestion = new QuestionRecord(req.body)
        await updateQuestion.update()
        res.json({ok: true})
    })
    .delete('/:id', async (req, res) => {
        const question = await QuestionRecord.getOne(req.params.id) as QuestionRecord

        if(question === null) {
         throw new ValidationError('Nie ma pytania o takim ID.')
        }

        await question.delete()
        res.json({ok: 'Pytanie zostało prawidłowo usunięte.'})
    })




