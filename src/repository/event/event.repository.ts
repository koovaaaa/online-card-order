import { EntityRepository, Repository } from 'typeorm';
import { Event } from '../../entity/event/event.entity';
import { FilterDto } from '../../api/user/user-event/dto/filter.dto';
import { PaginationDto } from '../../helper/dto/pagination.dto';

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {
  async findActiveEvents(filter: FilterDto, { limit, skip }: PaginationDto) {
    const events = this.createQueryBuilder('event')
      .where(filter)
      .andWhere('event.eventDate > :dateNow', { dateNow: new Date() })
      .orderBy('event.eventDate', 'DESC')
      .take(limit)
      .skip(skip)
      .leftJoinAndSelect('event.city', 'city')
      .leftJoinAndSelect('event.country', 'country')
      .leftJoinAndSelect('event.category', 'category');

    return events.getManyAndCount();
  }
}
