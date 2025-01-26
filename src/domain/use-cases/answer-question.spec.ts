import { expect, test } from'vitest'
import { AnswerQuestionUseCase } from './answer-question'

test('create an answer', () => {
    const answerQuestion = new AnswerQuestionUseCase()

    const answer = answerQuestion.execute({
        questionId: 'question-id',
        instructorId: 'instructor-id',
        content: 'answer content'
    })

    expect(answer.content).toEqual('answer content')
})