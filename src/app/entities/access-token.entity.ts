import {
  Entity,
  Column,
  ManyToOne,
  PrimaryColumn,
  CreateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

const DEFAULT_TTL = 1209600; // 2 weeks in seconds
const DEFAULT_RESET_PW_TTL = 15 * 60; // 15 mins in seconds
const DEFAULT_MAX_TTL = 31556926; // 1 year in seconds

@Entity({ name: 'SYSTEM_ACCESS_TOKEN' })
export class AccessTokenEntity {
  static ANONYMOUS = new AccessTokenEntity({ id: '$anonymous' });

  @PrimaryColumn()
  id: string;

  @Column({
    comment: 'time to live in seconds (2 weeks by default)',
    default: DEFAULT_TTL,
  })
  ttl: number;

  @Column({
    comment: 'Array of scopes granted to this access token.',
  })
  scopes: string[];

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserEntity, user => user.accessTokens)
  user: UserEntity;

  constructor(accessToken: Partial<AccessTokenEntity>) {
    Object.assign(this, accessToken);
  }
}
