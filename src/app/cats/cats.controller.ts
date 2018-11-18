import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Param,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from './transform.interceptor';
import { CreateCatDto } from './create-cat.dto';
import {
  ApiUseTags,
  ApiResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

const cats = [
  {
    id: 1,
    name: 'Kitty',
  },
  {
    id: 2,
    name: 'Bob',
  },
];

@ApiUseTags('cats')
@Controller('cats')
export class CatsController {
  constructor() {}

  @UseInterceptors(LoggingInterceptor, TransformInterceptor)
  @Get()
  findCats(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(cats);
      }, 500);
    });
  }

  @ApiNotFoundResponse({})
  @ApiOkResponse({})
  @ApiBearerAuth()
  @Get('/:id')
  findCatById(@Param('id') id: string): Promise<any> {
    const numId = +id;
    const res = cats.filter(item => {
      return item.id === numId;
    });
    if (res.length) {
      return Promise.resolve(res[0]);
    } else {
      throw new NotFoundException();
    }
  }

  @ApiOperation({ title: '创建 猫', description: '某种猫' })
  @ApiResponse({ status: 201, description: '成功创建' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post()
  createCat(@Body() dto: CreateCatDto) {
    console.log('create cat dto:', dto);
    cats.push(dto);
    return 'Cat created';
  }
}
