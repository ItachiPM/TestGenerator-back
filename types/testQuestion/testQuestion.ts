export interface TestQuestion {
    id?: string;
    question: string;
    correctAnswer: string;
    badAnswer1: string | null;
    badAnswer2: string | null;
    badAnswer3: string | null;
}

export interface QuestionResponse {
    id?: string;
    question: string;
    correctAnswer: Answer;
    badAnswer1: Answer | null;
    badAnswer2: Answer | null;
    badAnswer3: Answer | null;
}

type Answer = {
    answer: string;
    point: number;
}
