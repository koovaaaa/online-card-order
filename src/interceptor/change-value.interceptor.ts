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
      tap(async (orders) => {
        const baseForConversion =
          orders[0].cart.createdBy.country.baseForConversionToBAM;
        const currency = orders[0].cart.createdBy.country.currency;
        for (const order of orders) {
          order.orderPrice *= baseForConversion;
          order.orderPrice =
            order.orderPrice.toFixed(2).toString() + ' ' + currency;
        }
      }),
    );
  }
}
