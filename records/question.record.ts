import {TestQuestion} from "../types/testQuestion";
import {ValidationError} from "../utils/handleError";

export class QuestionRecord implements TestQuestion {
    id?: string;
    question: string;
    correctAnswer: string;
    badAnswer1: string | null;
    badAnswer2: string | null;
    badAnswer3: string | null;

    constructor(obj: TestQuestion) {
        if(obj.question.length === 0) {
            throw new ValidationError('Nie podana treść pytania');
        }
        if(obj.correctAnswer.length === 0) {
            throw new ValidationError('Brak poprawnej odpowiedzi.');
        }

        this.id = obj.id
        this.question = obj.question;
        this.correctAnswer = obj.correctAnswer;
        this.badAnswer1 = obj.badAnswer1;
        this.badAnswer2 = obj.badAnswer2;
        this.badAnswer3 = obj.badAnswer3;
    }



}
