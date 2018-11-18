import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';

import { TokenService } from '../services/token.service';

@Injectable()
export class UserService {
  static DEFAULT_SALT_ROUNDS = 10;
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly tokenSrv: TokenService,
  ) {}

  async findByToken(token: string): Promise<UserEntity | null> {
    if (token === 'FAKE_TOKEN') {
      const user = new UserEntity({});
    } else {
      return Promise.resolve(null);
    }
  }

  async findByUserName(username: string): Promise<UserEntity | null> {
    return this.userRepo.findOne({ where: { username } });
  }

  async login(creds: { username: string; password: string }) {
    try {
      const { username, password } = creds;
      const user = await this.findByUserName(username);
      if (user) {
        const isPasswordCorrect = await user.validatePassword(password);
        if (isPasswordCorrect) {
        } else {
        }
      }
    } catch (e) {
      throw e;
    }
  }

  changePassword() {}

  logout() {}

  register() {}

  createAccessToken(ttl?: number) {}
}
