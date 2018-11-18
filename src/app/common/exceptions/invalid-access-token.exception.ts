import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidAccessTokenException extends HttpException {
  constructor() {
    super('无效的 Access Token', HttpStatus.UNAUTHORIZED);
  }
}
