import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserRoleEnum } from '../../../enum/user-role.enum';

@Injectable()
export class EmployeeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return (
      user.role === UserRoleEnum.ADMIN || user.role === UserRoleEnum.EMPLOYEE
    );
  }
}
