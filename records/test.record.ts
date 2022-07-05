import {pool} from "../utils/db";
import {v4 as uuid} from 'uuid'
import {Module, QuestionRecordResponse, TestQuestionsResponse} from "../types";
import {TestQuestionRecord} from "./supportRecord/questionResponse.record";
import {ModuleRecord} from "./modules.record";
import {shuffleAnswers} from "../utils/shuffleAnswers";

export class TestRecord {

    static async createGeneralTest() {

        const modules: Module[] = await ModuleRecord.getAllModules()


        const questionsList: TestQuestionsResponse[] = [];

        for (const module of modules) {
            const [results] = await pool.execute('SELECT * FROM `questions` WHERE `module` = :module AND `badAnswer1` IS NOT NUll ORDER BY RAND() LIMIT 5', {
                module: module.module
            }) as QuestionRecordResponse;

            results.map(question => new TestQuestionRecord({
                id: question.id,
                question: question.question,
                answers: [
                    {
                        id: uuid(),
                        answer: question.correctAnswer,
                        points: 1,
                    },
                    {
                        id: uuid(),
                        answer: question.badAnswer1,
                        points: 0,
                    },
                    {
                        id: uuid(),
                        answer: question.badAnswer2,
                        points: 0,
                    },
                    {
                        id: uuid(),
                        answer: question.badAnswer3,
                        points: 0,
                    }
                ],
            }))
                .forEach(obj => questionsList.push(obj))
        }

        questionsList.map(questions => shuffleAnswers(questions.answers))

        return questionsList
    }

    static async createModuleTest(module: string, questionsCount: number) {

        const [results] = await pool.execute('SELECT * FROM `questions` WHERE `module` = :module AND `badAnswer1` IS NOT NUll ORDER BY RAND() LIMIT :questionsCount', {
            module,
            questionsCount
        }) as QuestionRecordResponse;

        const questionsList: TestQuestionsResponse[] = [];

        results.map(question => new TestQuestionRecord({
            id: question.id,
            question: question.question,
            answers: [
                {
                    id: uuid(),
                    answer: question.correctAnswer,
                    points: 1,
                },
                {
                    id: uuid(),
                    answer: question.badAnswer1,
                    points: 0,
                },
                {
                    id: uuid(),
                    answer: question.badAnswer2,
                    points: 0,
                },
                {
                    id: uuid(),
                    answer: question.badAnswer3,
                    points: 0,
                }
            ],
        }))
            .forEach(obj => questionsList.push(obj))


        questionsList.map(questions => shuffleAnswers(questions.answers))

        return questionsList
    }
}
