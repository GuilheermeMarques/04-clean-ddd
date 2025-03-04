import { AnswersRepository } from '@/domain/forum/apllication/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  async findById(id: string) {
    const answer = this.items.find((item) => item.id.toString() === id) || null

    if (!answer) {
      return null
    }

    return answer
  }

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }

  async delete(answer: Answer) {
    const itemIdenx = this.items.findIndex((item) => item.id === answer.id)

    this.items.splice(itemIdenx, 1)
  }
}
