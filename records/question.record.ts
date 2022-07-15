import {v4 as uuid} from "uuid";
import {Question, QuestionForAdmin, QuestionForAdminRecordResponse, QuestionRecordResponse} from "../types";
import {ValidationError} from "../utils/handleError";
import {pool} from "../utils/db";
import {QuestionAndAnswerRecord} from "./supportRecord/questionAndAnswer.record";
import {ModuleRecord} from "./modules.record";


export class QuestionRecord implements Question {
    id?: string;
    module: string;
    question: string;
    correctAnswer: string;
    badAnswer1: string | null;
    badAnswer2: string | null;
    badAnswer3: string | null;

    constructor(obj: Question) {
        if(obj.question.length === 0) {
            throw new ValidationError('Nie podano treści pytania.');
        }
        if(obj.correctAnswer.length === 0) {
            throw new ValidationError('Nie wprowadzono poprawnej odpowiedzi.');
        }

        if(obj.module.length === 0 || obj.module === 'Wybierz') {
            throw new ValidationError('Brak przyporządkowania pytania do przedmiotu.')
        }

        this.module = obj.module.charAt(0).toUpperCase() + obj.module.slice(1).toLowerCase();
        this.id = obj.id;
        this.question = obj.question;
        this.correctAnswer = obj.correctAnswer;
        this.badAnswer1 = obj.badAnswer1;
        this.badAnswer2 = obj.badAnswer2;
        this.badAnswer3 = obj.badAnswer3;
    }

    async insert() {
        let isNewModule = false
        if(!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert something that is already inserted.')
        }

        const moduleArray = await ModuleRecord.getAllModules();

        if(!moduleArray.find(el => el.module === this.module)) {
            isNewModule = true
            await ModuleRecord.addModule(this.module)
        }

        await pool.execute('INSERT INTO `questions` VALUES(:id, :question, :correctAnswer, :badAnswer1, :badAnswer2, :badAnswer3, :module)', {
            id: this.id,
            question: this.question,
            correctAnswer: this.correctAnswer,
            badAnswer1: this.badAnswer1,
            badAnswer2: this.badAnswer2,
            badAnswer3: this.badAnswer3,
            module: this.module,
        })

        return isNewModule
    }

    async update() {
        await pool.execute('UPDATE `questions` SET `question` = :question, `correctAnswer` = :correctAnswer, `badAnswer1` = :badAnswer1, `badAnswer2` = :badAnswer2, `badAnswer3` = :badAnswer3, `module` = :module  WHERE `id` = :id', {
            id: this.id,
            question: this.question,
            correctAnswer: this.correctAnswer,
            badAnswer1: this.badAnswer1,
            badAnswer2: this.badAnswer2,
            badAnswer3: this.badAnswer3,
            module: this.module,
        })
    }

    async delete() {
        await pool.execute('DELETE FROM `questions` WHERE `id` = :id', {
            id: this.id,
        })
    }

    static async getQuestionAndAnswer(): Promise<QuestionAndAnswerRecord[]> {
        const [results] = await pool.execute('SELECT `question`, `correctAnswer`, `module`, `id` FROM `questions`') as QuestionRecordResponse;

        return results.length === 0 ? null : results.map(q => new QuestionAndAnswerRecord({
            id: q.id,
            module: q.module,
            question: q.question,
            answer: q.correctAnswer,
        }));
    }

    static async getQuestionAndAnswerFromModule(module: string): Promise<QuestionAndAnswerRecord[]> {
        const [results] = await pool.execute('SELECT `question`, `correctAnswer`, `module`, `id` FROM `questions` WHERE `module` = :module', {
            module,
        }) as QuestionRecordResponse;

        return results.length === 0 ? null : results.map(q => new QuestionAndAnswerRecord({
            id: q.id,
            module: q.module,
            question: q.question,
            answer: q.correctAnswer,
        }));
    }

    static async search(content: string): Promise<QuestionForAdmin[]> {
        const [results] = await pool.execute('SELECT * FROM `questions` where `question` LIKE :content OR `correctAnswer` LIKE :content ', {
            content: `%${content}%`,
        }) as QuestionForAdminRecordResponse

        return results
    }

    static async searchAll(): Promise<QuestionForAdmin[]> {
        const [results] = await pool.execute('SELECT * FROM `questions`') as QuestionForAdminRecordResponse

        return results
    }

    static async getOne(id: string): Promise<Question> {
        const [results] = await pool.execute('SELECT * FROM `questions` WHERE `id` = :id', {
            id,
        }) as QuestionRecordResponse

        return results.length === 0 ? null : new QuestionRecord(results[0])
    }


}
