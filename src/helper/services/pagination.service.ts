import { Injectable } from '@nestjs/common';
import { ExceptionService } from './exception.service';
import { PaginationDto } from '../dto/pagination.dto';

@Injectable()
export class PaginationService {
  constructor(private readonly exceptionService: ExceptionService) {}
  setPagination(paginationDto: PaginationDto) {
    try {
      if (!paginationDto.page || paginationDto.page === 0)
        paginationDto.page = parseInt(process.env.DEFAULT_PAGE);
      paginationDto.limit =
        paginationDto.limit || parseInt(process.env.DEFAULT_PER_PAGE);
      paginationDto.skip = paginationDto.limit * (paginationDto.page - 1);

      return paginationDto;
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }
}
