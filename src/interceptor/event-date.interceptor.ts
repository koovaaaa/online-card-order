import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import * as moment from 'moment';

export class EventDateInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      tap(async (event) => {
        moment.locale('sr');
        event.eventDate = moment(event.eventDate).format(
          'dddd, DD. MMMM YYYY u HH:mm',
        );
      }),
    );
  }
}
