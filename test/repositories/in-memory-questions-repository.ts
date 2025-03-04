import { QuestionsRepository } from '@/domain/forum/apllication/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  async findById(id: string) {
    const question =
      this.items.find((item) => item.id.toString() === id) || null

    if (!question) {
      return null
    }

    return question
  }

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug) || null

    if (!question) {
      return null
    }

    return question
  }

  async create(question: Question): Promise<void> {
    this.items.push(question)
  }

  async delete(question: Question) {
    const itemIdenx = this.items.findIndex((item) => item.id === question.id)

    this.items.splice(itemIdenx, 1)
  }
}
