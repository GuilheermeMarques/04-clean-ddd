import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to fetch answer comment', async () => {
    const answerId = new UniqueEntityID('answer-1')

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId }),
    )

    const { answerComments } = await sut.execute({
      answerId: answerId.toString(),
      page: 1,
    })

    expect(answerComments).toHaveLength(3)
  })

  it('should be able to fetch paginated answer comment', async () => {
    const answerId = new UniqueEntityID('answer-1')

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({ answerId }),
      )
    }

    const { answerComments } = await sut.execute({
      answerId: answerId.toString(),
      page: 2,
    })

    expect(answerComments).toHaveLength(2)
  })
})
