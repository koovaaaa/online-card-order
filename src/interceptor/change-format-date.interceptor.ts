import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import * as moment from 'moment';

export class ChangeFormatDateInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      tap(async (events) => {
        for (const event of events) {
          event.eventDate = moment(event.eventDate).format('DD/MM/YYYY');
        }
      }),
    );
  }
}
