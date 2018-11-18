import { Injectable } from '@nestjs/common';
import { UserService } from '@user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userSrv: UserService) {}
  async validateUser(token: string): Promise<any> {
    return this.userSrv.findByToken(token);
  }
}
