import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { AgentTemplate } from '../models/agent-template';
import { CreateCredentialDefinitionRequest } from '../models/create-credential-definition-request';
import { CredentialDefinition } from '../models/credential-definition';
import { CredentialDefinitionId } from '../models/credential-definition-id';
import { Schema } from '../models/schema';
import { CredentialDefinitionService } from '../services/credential-definition.service';
import { SchemaService } from '../services/schema.service';

@Component({
  selector: 'anoncred-credential-definition-editor',
  templateUrl: './anoncred-credential-definition-editor.component.html',
  styleUrls: ['./anoncred-credential-definition-editor.component.css']
})
export class AnonCredCredentialDefinitionEditorComponent implements OnInit {

  @ViewChild('dt') dt: Table | null = null;

  credentialDefinitionIds: CredentialDefinitionId[] = [];

  schemaIds: string[] = [];

  editSchemaDialogVisible: boolean = false;

  curentCredentialDefinition: CredentialDefinition  = new CredentialDefinition();

  supportRevocation: boolean = false;

  revocationRegistrySize: number = 1000;

  agentTemplate: AgentTemplate | null = null;

  @Input('agentTemplate') 
  set setAgentTemplate(value: AgentTemplate | null) {
    this.agentTemplate = value;
  };

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private credentialDefinitionService: CredentialDefinitionService, private schemaService: SchemaService) { 
  }

  ngOnInit(): void {
    if (this.agentTemplate == null) return;
    let agentTemplate = this.agentTemplate;
    this.credentialDefinitionService.search(agentTemplate).pipe(takeUntil(this.ngUnsubscribe)).subscribe((credentialDefinitionIds: string[]) => {
      this.credentialDefinitionIds = [];
      for (const schemaId of credentialDefinitionIds) {
        this.credentialDefinitionIds.push(CredentialDefinitionId.parse(schemaId));
      }
    });
    this.schemaService.search(agentTemplate).pipe(takeUntil(this.ngUnsubscribe)).subscribe((schemaIds: string[]) => {
      this.schemaIds = schemaIds;
    });
  }

  editCredentialDefinition(credentialDefinitionId: CredentialDefinitionId): void {
    if (this.agentTemplate == null) return;
    let agentTemplate = this.agentTemplate;
    this.credentialDefinitionService.get(agentTemplate, credentialDefinitionId.toString()).pipe(takeUntil(this.ngUnsubscribe)).subscribe((credentialDefinition: CredentialDefinition) => {
      this.curentCredentialDefinition = credentialDefinition;
      this.schemaService.get(agentTemplate, credentialDefinition.schemaId).pipe(takeUntil(this.ngUnsubscribe)).subscribe((schema: Schema) => {
        this.curentCredentialDefinition.schemaId = schema.toString();
        this.editSchemaDialogVisible = true;
      });
      
    });
  }

  changeSchemaId(value: string): void {
    this.curentCredentialDefinition.schemaId = value;
  }

  addCredentialDefinition(): void {
    this.curentCredentialDefinition = new CredentialDefinition();
    this.editSchemaDialogVisible = true;
  }

  cancelEditSchema(): void {
    this.curentCredentialDefinition  = new CredentialDefinition();
    this.editSchemaDialogVisible = false;
  }

  acceptEditSchema(): void {
    if (this.agentTemplate == null) return;
    let agentTemplate = this.agentTemplate;
    let request = new CreateCredentialDefinitionRequest();
    request.supportRevocation = this.supportRevocation;
    request.revocationRegistrySize = this.revocationRegistrySize;
    request.schemaId = this.curentCredentialDefinition.schemaId;
    request.tag = this.curentCredentialDefinition.tag;
    
    this.credentialDefinitionService.create(agentTemplate, request).pipe(takeUntil(this.ngUnsubscribe)).subscribe((response: string) => {
      this.curentCredentialDefinition  = new CredentialDefinition();
      this.editSchemaDialogVisible = false;
      this.ngOnInit();
    });
  }
}
