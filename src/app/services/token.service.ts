import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessTokenEntity } from '../entities/access-token.entity';
import uid from 'uid2';

const DEFAULT_TOKEN_LEN = 64;
@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(AccessTokenEntity)
    private readonly tokenRepo: Repository<AccessTokenEntity>,
  ) {}
  /**
   * 通过 id 解析并验证 access token
   * @param id Access token
   */
  async resolve(id: string): Promise<any> {
    try {
      const token = await this.tokenRepo.findOne(id);

      if (token) {
        const isValid = await this.validateToken(token);
        if (isValid) {
          return token;
        }
        throw new UnauthorizedException('无效的 Access Token');
      }
    } catch (e) {
      throw e;
    }
  }

  async validateToken(token: AccessTokenEntity) {
    try {
      const now = Date.now();
      const created = token.createdAt.getTime();
      const elapsedSeconds = (now - created) / 1000;
      const secondsToLive = token.ttl;
      const isValid = elapsedSeconds < secondsToLive;

      if (!isValid) {
        await this.tokenRepo.remove([token]);
      }

      return isValid;
    } catch (e) {
      throw e;
    }
  }

  async createAccessTokenId(): Promise<any> {
    return new Promise((resolve, reject) => {
      uid(DEFAULT_TOKEN_LEN, (err, guid) => {
        if (err) {
          return reject(err);
        }
        resolve(guid);
      });
    });
  }
}
