import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'credential' })
export class Credential extends BaseEntity {

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  laboratoryId: string;

  @Column({ type: 'jsonb', nullable: true })
  anoncred: any;

  @Column({ type: 'jsonb', nullable: true })
  credentialDefinition: any;

  @Column({ type: 'jsonb', nullable: true })
  ocaForm: any;

  @Column('boolean', { default: false })
  revocable: boolean = false;

  @Column({ type: 'int', nullable: true })
  revocationRegistrySize: number;

  @Column({ type: 'varchar', nullable: true })
  agentTemplateId: string;
}