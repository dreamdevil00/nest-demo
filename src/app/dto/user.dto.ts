import { IsEmail, Length, IsMobilePhone, IsNotEmpty } from 'class-validator';

export class UserDto {
  id: number;
  @IsNotEmpty()
  username: string;

  @Length(6, 20)
  @IsNotEmpty()
  passwordHash: string;

  @IsEmail()
  email: string;

  emailVerified: boolean;

  @IsMobilePhone('zh-CN')
  telephone: number;

  createdAt: Date;

  updatedAt: Date;

  status: number;
  password: string;
}
