import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { EmployeeGuard } from '../../auth/guards/employee.guard';
import { EmployeeOrderService } from './employee-order.service';
import { Order } from '../../../entity/order/order.entity';

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
}
