import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import * as moment from 'moment';

export class ChangeFormatDateInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      tap(async (response) => {
        for (const event of response.events) {
          event.eventDate = moment(event.eventDate).format('DD/MM/YYYY');
          event.createdAt = moment(event.createdAt).format('DD/MM/YYYY');
        }
      }),
    );
  }
}
