import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'agentevent' })
export class AgentEvent extends BaseEntity {

  @Column({ type: 'varchar', length: 300 })
  agentSlug: string;

  @Column({ type: 'varchar', length: 300 })
  topic: string;

  @Column({ nullable: true, type: 'varchar', length: 100 })
  state: string;

  @Column({ nullable: true, type: 'varchar', length: 100 })
  connectionId: string;

  @Column({ nullable: true, type: 'varchar', length: 65535 })
  payload: string;

}