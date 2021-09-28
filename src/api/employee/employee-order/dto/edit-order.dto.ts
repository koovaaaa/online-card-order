import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatusEnum } from '../../../../enum/order-status.enum';

export class EditOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(OrderStatusEnum)
  orderStatus: OrderStatusEnum;
}
