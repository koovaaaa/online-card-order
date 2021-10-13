import { Injectable } from '@nestjs/common';
import { ExceptionService } from './exception.service';
import { PaginationDto } from '../dto/pagination.dto';
import { PaginationTypeEnum } from '../../enum/pagination-type.enum';

@Injectable()
export class PaginationService {
  constructor(private readonly exceptionService: ExceptionService) {}
  setPagination(paginationDto: PaginationDto, type: PaginationTypeEnum) {
    try {
      if (!paginationDto.page || paginationDto.page === 0)
        paginationDto.page = parseInt(process.env.DEFAULT_PAGE);
      paginationDto.limit =
        paginationDto.limit ||
        (type === PaginationTypeEnum.EVENT_LIST
          ? parseInt(process.env.DEFAULT_PER_PAGE)
          : parseInt(process.env.DEFAULT_PER_PAGE_FOR_TABLE));
      paginationDto.skip = paginationDto.limit * (paginationDto.page - 1);
      return paginationDto;
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }
}
