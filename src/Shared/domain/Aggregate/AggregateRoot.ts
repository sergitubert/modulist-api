import { DomainEvent } from '../DomainEvent';

export abstract class AggregateRoot {
    private domainEvents: DomainEvent[];

    constructor() {
        this.domainEvents = [];
    }

    pullDomainEvents(): DomainEvent[] {
        const domainEvents = [...this.domainEvents];
        this.domainEvents = [];
        return domainEvents;
    }

    record(domainEvent: DomainEvent): void {
        this.domainEvents.push(domainEvent);
    }

    abstract toPrimitives(): any;
}
