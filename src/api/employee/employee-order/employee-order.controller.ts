import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { EmployeeGuard } from '../../auth/guards/employee.guard';
import { EmployeeOrderService } from './employee-order.service';
import { Order } from '../../../entity/order/order.entity';
import { EditOrderDto } from './dto/edit-order.dto';
import { UpdateResult } from 'typeorm';

@ApiTags('Employee Order')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, EmployeeGuard)
@Controller('employee-order')
export class EmployeeOrderController {
  constructor(private readonly employeeOrderService: EmployeeOrderService) {}
  @Get('get-active-orders')
  async getActiveOrders(): Promise<Order[]> {
    return await this.employeeOrderService.getOrdersWithStatusPending();
  }

  @Get('get-order-history')
  async getOrderHistory(): Promise<Order[]> {
    return await this.employeeOrderService.getOrderHistory();
  }

  @Put('change-order-status/:id')
  async acceptOrRejectOrder(
    @Param('id') orderId: string,
    @Body() { orderStatus }: EditOrderDto,
  ): Promise<UpdateResult> {
    return await this.employeeOrderService.acceptOrRejectOrder(
      orderId,
      orderStatus,
    );
  }
}
