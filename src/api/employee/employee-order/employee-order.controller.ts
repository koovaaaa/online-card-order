import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { EmployeeGuard } from '../../auth/guards/employee.guard';
import { EmployeeOrderService } from './employee-order.service';
import { Order } from '../../../entity/order/order.entity';
import { EditOrderDto } from './dto/edit-order.dto';
import { UpdateResult } from 'typeorm';
import { PaginationDto } from '../../../helper/dto/pagination.dto';

@ApiTags('Employee Order')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, EmployeeGuard)
@Controller('employee-order')
export class EmployeeOrderController {
  constructor(private readonly employeeOrderService: EmployeeOrderService) {}
  @Get('get-active-orders')
  async getActiveOrders(
    @Query() pagination: PaginationDto,
  ): Promise<{ orders: Order[]; numberOfOrders: number }> {
    return await this.employeeOrderService.getOrdersWithStatusPending(
      pagination,
    );
  }

  @Get('get-order-history')
  async getOrderHistory(
    @Query() pagination: PaginationDto,
  ): Promise<{ orders: Order[]; numberOfOrders: number }> {
    return await this.employeeOrderService.getOrderHistory(pagination);
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
