import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'issuecredential' })
export class IssueCredential extends BaseEntity {

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'jsonb', nullable: false })
  credentialPreview: any;

  @Column('boolean', { default: false })
  revocable: boolean = false;

  @Column('boolean', { default: false })
  revoked: boolean = false;

  @Column({ type: 'varchar', nullable: false })
  credentialExchangeId: string;

  @Column({ type: 'varchar', nullable: false })
  agentTemplateId: string;
}