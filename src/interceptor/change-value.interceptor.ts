import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class ChangeValueInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      tap(async (response) => {
        if (response.orders.length) {
          const baseForConversion =
            response.orders[0].cart.createdBy.country.baseForConversionToBAM;
          const currency = response.orders[0].cart.createdBy.country.currency;
          for (const order of response.orders) {
            order.orderPrice *= baseForConversion;
            order.orderPrice =
              order.orderPrice.toFixed(2).toString() + ' ' + currency;
          }
        }
      }),
    );
  }
}
