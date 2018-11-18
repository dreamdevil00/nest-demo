import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { IsEmail, Length, IsMobilePhone, IsNotEmpty } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

import * as bcrypt from 'bcrypt';
import { AccessTokenEntity } from './access-token.entity';
const DEFAULT_SALT_ROUNDS = 10;

@Entity('SYSTEM_USER')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  @IsNotEmpty()
  @Length(8)
  username: string;

  @Column({
    length: 250,
    select: false,
    transformer: {
      async to(value: string): Promise<string> {
        const hashed = await bcrypt.hash(value, DEFAULT_SALT_ROUNDS);
        return hashed;
      },
      from(value: string) {
        return value;
      },
    },
  })
  @Exclude()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @Column({
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column({
    default: false,
  })
  emailVerified: boolean;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  // 计算属性
  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Column()
  @IsMobilePhone('zh-CN')
  telephone: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    enum: [0, 1, 2, 3],
  })
  status: number;

  @Column()
  comment: string;

  @OneToMany(() => AccessTokenEntity, accessToken => accessToken.user)
  accessTokens: AccessTokenEntity[];

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  async validatePassword(val: string): Promise<boolean> {
    const result = await bcrypt.compare(val, this.password);
    return result;
  }
}
