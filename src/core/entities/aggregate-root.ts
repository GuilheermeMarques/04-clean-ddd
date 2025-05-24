import { Entity } from '@/core/entities/entity'
import { DomainEvent } from '../events/domain-event'
import { DomainEvents } from '@/core/events/domain-events'

export abstract class AggregateRoot<Props> extends Entity<Props> {
  private _domainEvents: DomainEvent[] = []

  get domainEvents(): DomainEvent[] {
    return this._domainEvents
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this.domainEvents.push(domainEvent)
    DomainEvents.markAggregateForDispatch(this)
  }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length)
  }

  public getUncommittedEvents(): DomainEvent[] {
    return this.domainEvents.filter((event) => !event.ocurredAt)
  }

  public commit(): void {
    this.clearEvents()
    DomainEvents.dispatchEventsForAggregate(this.id)
  }
}
