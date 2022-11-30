import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'verification' })
export class Verification extends BaseEntity {

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  laboratoryId: string;

  @Column({ type: 'jsonb', nullable: true })
  credentialRequests: any;

  @Column({ type: 'varchar', nullable: true })
  agentTemplateId: string;

}