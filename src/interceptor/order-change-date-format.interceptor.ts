import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import * as moment from 'moment';

export class OrderChangeDateFormatInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      tap((orders) => {
        for (const order of orders.orders) {
          order.createdAt = moment(order.createdAt).format(
            'DD/MM/YYYY u HH:mm',
          );
        }
      }),
    );
  }
}
