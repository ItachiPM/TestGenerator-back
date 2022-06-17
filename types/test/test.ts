export interface TestQuestionsResponse {
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
