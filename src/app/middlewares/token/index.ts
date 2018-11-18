import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import { Request, Response } from 'express';
import { TokenService } from '../../services/token.service';
/*
@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(private readonly tokenSrv: TokenService) {}
  resolve(...args: any[]): MiddlewareFunction<Request, Response> {
    return (req, res, next) => {
      next();
    };
  }
}
*/
