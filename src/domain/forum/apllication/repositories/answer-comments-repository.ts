import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { PaginationParams } from '@/core/repositories/pagination-params'
export interface AnswerCommentsRepository {
  findById(id: string): Promise<AnswerComment | null>
  findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]>
  create(answerComment: AnswerComment): Promise<void>
  delete(questionComment: AnswerComment): Promise<void>
}
