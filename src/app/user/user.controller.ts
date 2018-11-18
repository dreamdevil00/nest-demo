import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Param,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { CreateUserDto } from '@dto/create-user.dto';

import { ApiUseTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiUseTags('users')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly userSrv: UserService,
  ) {}

  @Get()
  find() {
    // return this.userSrv.find();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return new UserEntity({
      id: id,
      username: 'foo',
      password: 'Passw0rd',
      firstName: '元宝',
      lastName: '黄',
    });
  }

  @Post()
  async create(@Body() user: CreateUserDto) {
    return new UserEntity(user);
  }
}
