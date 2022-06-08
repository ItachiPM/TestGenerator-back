import {v4 as uuid} from "uuid";
import {Module, TestQuestion} from "../types/testQuestion";
import {ValidationError} from "../utils/handleError";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {QuestionResponseRecord} from "./questionResponse.record";

type QuestionRecordResponse = [TestQuestion[], FieldPacket[]]
type ModuleEntity = [Module[], FieldPacket[]]

export class QuestionRecord implements TestQuestion {
    id?: string;
    module: string;
    question: string;
    correctAnswer: string;
    badAnswer1: string | null;
    badAnswer2: string | null;
    badAnswer3: string | null;

    constructor(obj: TestQuestion) {
        if(obj.question.length === 0) {
            throw new ValidationError('Nie podana treść pytania.');
        }
        if(obj.correctAnswer.length === 0) {
            throw new ValidationError('Brak poprawnej odpowiedzi.');
        }

        if(obj.module.length === 0) {
            throw new ValidationError('Brak przyporządkowania pytania do przedmiotu.')
        }

        this.module = obj.module;
        this.id = obj.id;
        this.question = obj.question;
        this.correctAnswer = obj.correctAnswer;
        this.badAnswer1 = obj.badAnswer1;
        this.badAnswer2 = obj.badAnswer2;
        this.badAnswer3 = obj.badAnswer3;
    }

    static async getAllModules() {
        const [results] = await pool.execute('SELECT * FROM `modules`') as ModuleEntity;

        return results.map(el => el.module);
    }

    static async addModule(module: string) {
        await pool.execute('INSERT INTO `modules` (`module`)  VALUES(:module)', {
            module
        })
    }

    async insert() {
        if(!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert something that is already inserted.')
        }

        const moduleArray = await QuestionRecord.getAllModules();

        if(!moduleArray.find(el => el === this.module)) {
            await QuestionRecord.addModule(this.module)
        }

        await pool.execute('INSERT INTO `question` VALUES(:id, :question, :correctAnswer, :badAnswer1, :badAnswer2, :badAnswer3, :module)', {
            id: this.id,
            question: this.question,
            correctAnswer: this.correctAnswer,
            badAnswer1: this.badAnswer1,
            badAnswer2: this.badAnswer2,
            badAnswer3: this.badAnswer3,
            module: this.module,
        })
    }

    static async delete(id: string) {
        await pool.execute('DELETE FROM `question` WHERE `id` = :id', {
            module,
            id,
        })
    }

    static async getAllQuestionsFromModule(module: string) {
        const [results] = await pool.execute('SELECT * FROM `question` WHERE `module` = :module', {
            module,
        }) as QuestionRecordResponse;

        return results.length === 0 ? null : results.map(question => new QuestionResponseRecord({
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
    }

    static async getAllQuestions() {
        const [results] = await pool.execute('SELECT * FROM `question`') as QuestionRecordResponse;

        return results.length === 0 ? null : results.map(question => new QuestionResponseRecord({
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
    }

}
