import {FieldPacket} from "mysql2";

export interface Question {
    id?: string;
    module: string;
    question: string;
    correctAnswer: string;
    badAnswer1: string | null;
    badAnswer2: string | null;
    badAnswer3: string | null;
}

export interface ListQuestionEntity {
    id: string;
    module: string;
    question: string;
    answer: string;
}

export type QuestionRecordResponse = [Question[], FieldPacket[]]

