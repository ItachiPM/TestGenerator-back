import {Answer, TestQuestionsResponse} from "../../types";

export class TestQuestionRecord implements TestQuestionsResponse {
    id: string;
    question: string;
    answers: Answer[];

    constructor(obj: TestQuestionsResponse) {
        this.id = obj.id;
        this.question = obj.question;
        this.answers = obj.answers;
    }
}
