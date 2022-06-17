import {ListQuestionEntity} from "../../types";

export class QuestionAndAnswerRecord implements ListQuestionEntity{
    id: string;
    question: string;
    answer: string;
    module: string;

    constructor(obj: ListQuestionEntity) {
        this.id = obj.id;
        this.module = obj.module;
        this.question = obj.question;
        this.answer = obj.answer;
    }
}
