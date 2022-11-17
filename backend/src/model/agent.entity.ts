import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'agent' })
export class Agent extends BaseEntity {

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  laboratoryId: string;

  @Column({ type: 'varchar', length: 2000 })
  url: string;

  @Column({ nullable: true, type: 'varchar', length: 2000 })
  apiKey: string;

}