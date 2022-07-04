import {QuestionRecord} from "../records/question.record";
import {pool} from "../utils/db";

const defaultObj = new QuestionRecord({
    badAnswer1: '20',
    badAnswer2: '4',
    badAnswer3: '1',
    correctAnswer: '2',
    module: 'genetyka',
    question: 'ile nog posiada dorosły samiec człowieka'

})

afterAll(async () => {
    await pool.end();
})

test('Correct build QuestionRecord', () => {
    const question = new QuestionRecord(defaultObj);

    expect(question.question).toBe('ile nog posiada dorosły samiec człowieka')
    expect(question.correctAnswer).toBe('2')
})

test('check that validation throw correct errors', () => {
    const question = new QuestionRecord(defaultObj)

    expect(() => new QuestionRecord({
        ...question,
        question: '',
    })).toThrow('Nie podana treść pytania.');

    expect(() => new QuestionRecord({
        ...question,
        correctAnswer: '',
    })).toThrow('Brak poprawnej odpowiedzi.');

    expect(() => new QuestionRecord({
        ...question,
        module: '',
    })).toThrow('Brak przyporządkowania pytania do przedmiotu.')
})
