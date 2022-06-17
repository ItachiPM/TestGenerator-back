import {pool} from "../utils/db";
import {Module, QuestionRecordResponse, TestQuestionsResponse} from "../types";
import {TestQuestionRecord} from "./supportRecord/questionResponse.record";
import {ModuleRecord} from "./modules.record";

export class TestRecord {

    static async createGeneralTest() {

        const modules: Module[] = await ModuleRecord.getAllModules()


        const questionsList: TestQuestionsResponse[] = [];

        for(const module of modules) {
            const [results] = await pool.execute('SELECT * FROM `questions` WHERE `module` = :module ORDER BY RAND() LIMIT 5', {
                module: module.module
            }) as QuestionRecordResponse;

            results.map(question => new TestQuestionRecord({
                    id: question.id,
                    question: question.question,
                    correctAnswer: {
                        answer: question.correctAnswer,
                        points: 1,
                    },
                    badAnswer1: {
                        answer: question.badAnswer1,
                        points: 0,
                    },
                    badAnswer2: {
                        answer: question.badAnswer2,
                        points: 0,
                    },
                    badAnswer3: {
                        answer: question.badAnswer3,
                        points: 0,
                    },
                }))
                .forEach(obj => questionsList.push(obj))
        }

        return questionsList
    }
}
