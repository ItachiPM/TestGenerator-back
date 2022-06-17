import {Answer, TestQuestionsResponse} from "../../types";

export class TestQuestionRecord implements TestQuestionsResponse {
    id: string;
    question: string;
    correctAnswer: Answer;
    badAnswer1: Answer | null;
    badAnswer2: Answer | null;
    badAnswer3: Answer | null;

    constructor(obj: TestQuestionsResponse) {
        this.id = obj.id;
        this.question = obj.question;
        this.correctAnswer = obj.correctAnswer;
        this.badAnswer1 = obj.badAnswer1;
        this.badAnswer2 = obj.badAnswer2;
        this.badAnswer3 = obj.badAnswer3;
    }
}
