import {Answer, QuestionResponse} from "../types/testQuestion";

export class QuestionResponseRecord implements QuestionResponse {
    id: string;
    question: string;
    correctAnswer: Answer;
    badAnswer1: Answer | null;
    badAnswer2: Answer | null;
    badAnswer3: Answer | null;

    constructor(obj: QuestionResponse) {
        this.id = obj.id;
        this.question = obj.question;
        this.correctAnswer = obj.correctAnswer;
        this.badAnswer1 = obj.badAnswer1;
        this.badAnswer2 = obj.badAnswer2;
        this.badAnswer3 = obj.badAnswer3;
    }
}
