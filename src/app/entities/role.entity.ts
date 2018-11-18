import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('SYSTEM_ROLE')
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  enabled: boolean;
}
