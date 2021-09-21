import { EntityRepository, Repository } from 'typeorm';
import { Event } from '../../entity/event/event.entity';

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {}
