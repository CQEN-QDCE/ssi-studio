import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { CreateInvitationResponse as ConnectionInvitation } from '../models/create-invitation-response';
import { CredentialDefinition } from '../models/credential-definition';
import { QuestionBase } from '../models/question-base';
import { TextboxQuestion } from '../models/question-textbox';
import { Schema } from '../models/schema';
import { CredentialDefinitionService } from '../services/credential-definition.service';
import { IssuerService } from '../services/issuer.service';
import { QuestionService } from '../services/question.service';
import { SchemaService } from '../services/schema.service';
import { Connection } from '../models/connection';
import { CredentialProposalRequest } from '../models/credential-proposal-request';
import { CredentialProposalResponse } from '../models/credential-proposal-response';
import { CredentialAttribute } from '../models/credential-attribute';
import { CredentialDefinitionId } from '../models/credential-definition-id';
import { SchemaId } from '../models/schema-id';
import { ConnectionService } from '../services/connection.service';
import { AgentTemplate } from '../models/agent-template';
import { IssueCredentialService } from '../services/issue-credential.service';
import { IssueCredential } from '../models/issue-credential';

@Component({
  selector: 'credential-issuer',
  templateUrl: './credential-issuer.component.html',
  styleUrls: ['./credential-issuer.component.css'],
  providers:  [QuestionService]
})
export class CredentialOfferComponent implements OnInit, OnDestroy {
  
  schemaName: string = '';

  attributeValues: QuestionBase<string>[];

  invitationUrl: string = '';

  offerLinkVisible: boolean = false;

  offerLinkUrl: string = '';

  agentTemplate: AgentTemplate | null = null;

  private connectionId: string = '';

  private schema: Schema | null = null;

  private credentialDefinition: CredentialDefinition | null = null;

  private revocable: boolean = false;

  private credentialDefinitionId: string | null = null;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  @Output() credentialIssued = new EventEmitter();

  @Input('credentialDefinition') 
  set setCredentialDefinition(value: CredentialDefinition | null) {
    this.credentialDefinition = value;
    if (this.credentialDefinition) {
      const schemaId = SchemaId.parse(this.credentialDefinition.schemaId);
      this.schemaName = schemaId.name;
      this.changeCredentialDefinitionId(this.credentialDefinition.id); 
    }
  };

  @Input('revocable') 
  set setRevocable(value: boolean) {
    this.revocable = value;
  };

  @Input('agentTemplate') 
  set setAgentTemplate(value: AgentTemplate | null) {
    this.agentTemplate = value;
  };

  @ViewChild('attributesForm') attributesForm: DynamicFormComponent | null = null;
 
  constructor(private credentialDefinitionService: CredentialDefinitionService, 
              private schemaService: SchemaService, 
              private issuerService: IssuerService, 
              private issueCredentialService: IssueCredentialService, 
              private connectionService: ConnectionService) { 
    this.attributeValues = [];
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): any {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  isValid(): boolean {
    if (!this.attributesForm) return false;
    return this.attributesForm?.isValid();
  }

  offerCredential(): void {
    if (!this.attributesForm?.isValid()) return;
    if (this.agentTemplate == null) return;
    let agentTemplate = this.agentTemplate;
    this.connectionService.createInvitation(agentTemplate).pipe(takeUntil(this.ngUnsubscribe)).subscribe((connectionInvitation: ConnectionInvitation) => {
      this.invitationUrl = connectionInvitation.invitationUrl;
      this.connectionId = connectionInvitation.connectionId; 
      let credentialProposal: CredentialProposalRequest = this.buildCredentialProposal();
      this.offerLinkVisible = true;
      this.offerLinkUrl = connectionInvitation.invitationUrl;
      this.connectionService.waitRequest(agentTemplate, this.connectionId).subscribe((connection: Connection) => {
        this.connectionService.accept(agentTemplate, connection.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe((connection: Connection) => {
          this.issuerService.send(agentTemplate, credentialProposal).pipe(takeUntil(this.ngUnsubscribe)).subscribe((connection: CredentialProposalResponse) => {
            this.issuerService.waitResponseToOffer(agentTemplate, connection.credentialExchangeId).subscribe((connection: CredentialProposalResponse) => {
              const issueCredential = new IssueCredential();
              issueCredential.name = connection.credentialProposalDict.schema_name;
              issueCredential.credentialPreview = connection.credentialOfferDict.credential_preview.attributes;
              issueCredential.credentialExchangeId = connection.credentialExchangeId;
              issueCredential.agentTemplateId = agentTemplate.id;
              issueCredential.revocable = this.revocable;
              this.issueCredentialService.save(issueCredential).subscribe(() => {
                this.credentialIssued.emit();
              });
            });
          });
        });
      });
    });
  }

  private changeCredentialDefinitionId(value: string): void {
    this.credentialDefinitionId = value;
    if (this.agentTemplate == null) return;
    let agentTemplate = this.agentTemplate;
    this.credentialDefinitionService.get(agentTemplate, value).pipe(takeUntil(this.ngUnsubscribe)).subscribe((credentialDefinition: CredentialDefinition) => {
      this.credentialDefinition = credentialDefinition;
      this.schemaService.get(agentTemplate, credentialDefinition.schemaId).pipe(takeUntil(this.ngUnsubscribe)).subscribe((schema: Schema) => {
        this.schema = schema;
        const attributeValues: QuestionBase<string>[] = [];
        let order = 1;
        for (const attributeName of schema.attributeNames) {
          attributeValues.push(new TextboxQuestion({
            key: attributeName,
            label: attributeName,
            value: '',
            required: true,
            order: order
          }));
          order++;
        }
        this.attributeValues = attributeValues;
      });
    });
  }

  private buildCredentialProposal(): CredentialProposalRequest {
    let attributesPayload = JSON.parse(this.attributesForm?.payload() || '');  
    let credentialProposalRequest: CredentialProposalRequest = new CredentialProposalRequest();
    credentialProposalRequest.issuerDid = CredentialDefinitionId.parse(this.credentialDefinition?.id || '').did;
    credentialProposalRequest.schemaId = `${this.schema?.id}`;
    credentialProposalRequest.schemaName = this.schema?.name || '';
    credentialProposalRequest.schemaVersion = this.schema?.version || '';
    credentialProposalRequest.connectionId = this.connectionId;
    credentialProposalRequest.schemaIssuerDid = SchemaId.parse(this.schema?.id || '').did;
    credentialProposalRequest.credentialDefinitionId = this.credentialDefinitionId || '';
    
    for (const property in attributesPayload) {
      let ca = new CredentialAttribute();
      ca.name = property;
      ca.value = attributesPayload[property];
      credentialProposalRequest.credentialProposal.attributes.push(ca);
    }

    return credentialProposalRequest;
  } 
}