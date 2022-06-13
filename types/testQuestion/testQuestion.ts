export interface TestQuestion {
    id?: string;
    module: string;
    question: string;
    correctAnswer: string;
    badAnswer1: string | null;
    badAnswer2: string | null;
    badAnswer3: string | null;
}

export interface QuestionResponse {
    id: string;
    question: string;
    correctAnswer: Answer;
    badAnswer1: Answer | null;
    badAnswer2: Answer | null;
    badAnswer3: Answer | null;
}

export type Answer = {
    answer: string;
    points: number;
}

export interface Module {
    id: string;
    module: string
}

export interface ListQuestionEntity {
    id: string;
    module: string;
    question: string;
    answer: string;
}
