import { IsEmail, Length, IsMobilePhone, IsNotEmpty } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiModelProperty({
    description: '用户名 8-20 字符',
    minLength: 8,
    maxLength: 20,
  })
  @Length(8)
  @IsNotEmpty()
  username: string;

  @ApiModelProperty({
    description: '用户密码',
    minLength: 8,
  })
  @Length(6, 20)
  @IsNotEmpty()
  password: string;

  @ApiModelPropertyOptional({
    description: '电子邮件',
  })
  @IsEmail()
  email: string;

  @ApiModelPropertyOptional({
    description: '电话号码',
  })
  @IsMobilePhone('zh-CN')
  telephone: number;

  @ApiModelProperty({
    description: '名字',
  })
  firstName: string;

  @ApiModelProperty({
    description: '姓氏',
  })
  lastName: string;
}
