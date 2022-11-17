import * as _ from 'lodash';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom, Subject, takeUntil } from 'rxjs';
import { CredentialDefinition } from '../models/credential-definition';
import { CredentialTemplate } from '../models/credential-template';
import { CredentialTemplateService } from '../services/credential-template.service';
import { SchemaService } from '../services/schema.service';
import { CredentialDefinitionService } from '../services/credential-definition.service';
import { CreateSchemaRequest } from '../models/create-schema-request';
import { CreateSchemaResponse } from '../models/create-schema-response';
import { CreateCredentialDefinitionRequest } from '../models/create-credential-definition-request';
import { CredentialOfferComponent } from '../credential-issuer/credential-issuer.component';
import { OcaLanguageSelectorComponent } from '../oca/components/oca-language-selector.component';
import { ConfirmationService } from 'primeng/api';
import { OcaEditorComponent } from '../oca/components/oca-editor.component';
import { AgentTemplate } from '../models/agent-template';
import { AgentTemplateService } from '../services/agent-template.service';
import { TranslateService } from '@ngx-translate/core';
import { AnonCredSchemaFormComponent } from '../anoncred/anoncred-schema-form.component';

@Component({
  selector: 'credential-template',
  templateUrl: './credential-template.component.html',
  styleUrls: ['./credential-template.component.css']
})
export class CredentialTemplateComponent implements OnInit, OnDestroy {

  credentialTemplates: CredentialTemplate[] = [];

  credentialTemplate: CredentialTemplate = new CredentialTemplate();

  credentialTemplateDialogVisible: boolean = false;

  ocaCredentialTemplateDialogVisible: boolean = false;

  credentialTemplateViewDialogVisible: boolean = false;

  offerCredentialDialogVisible: boolean = false;

  offerLinkVisible: boolean = false;

  blocked: boolean = false;

  newVersion: boolean = false;

  confirmLabel: string = 'Confirm';

  agentTemplate: AgentTemplate = new AgentTemplate();

  credentialDefinition: CredentialDefinition | null = null;
  
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  private laboratoryId: string | null = null;

  @ViewChild('ocaEditor') ocaEditor: OcaEditorComponent | null = null;

  @ViewChild('credentialOffer') credentialOffer: CredentialOfferComponent | null = null;

  @ViewChild('languageSelector') languageSelector: OcaLanguageSelectorComponent | null = null;

  @ViewChild('anoncredForm') anoncredForm: AnonCredSchemaFormComponent | null = null;
    
  constructor(private readonly route: ActivatedRoute, 
              private readonly schemaService: SchemaService,
              private readonly credentialDefinitionService: CredentialDefinitionService,
              private readonly agentTemplateService: AgentTemplateService,
              private readonly confirmationService: ConfirmationService,
              private readonly credentialTemplateService: CredentialTemplateService,
              private readonly translate: TranslateService) { 
  }

  async ngOnInit(): Promise<void> {
    this.route.parent?.paramMap.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
      let laboratoryId = params.get('id');
      if (laboratoryId) {
        this.credentialTemplateService.getAllByLaboratory(laboratoryId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(credentialTemplates => {
          this.laboratoryId = laboratoryId;
          this.credentialTemplates = credentialTemplates;
        });
      }
    })
    await lastValueFrom(this.translate.get('Translation'));
  }

  changeAgentTemplateId(agentTemplate: AgentTemplate): void {
    this.credentialTemplate.agentTemplateId = agentTemplate.id;
  }

  ngOnDestroy(): any {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  addCredentialTemplate(): void {
    this.credentialTemplate = new CredentialTemplate();
    this.credentialTemplate.laboratoryId = this.laboratoryId || '';
    this.credentialTemplate.credentialDefinition = new CredentialDefinition();
    this.confirmLabel = this.translate.instant('CreateLabel');
    this.credentialTemplateDialogVisible = true;
  }

  addOCACredentialTemplate(): void {
    this.credentialTemplate = new CredentialTemplate();
    this.credentialTemplate.laboratoryId = this.laboratoryId || '';
    this.ocaCredentialTemplateDialogVisible = true;
  }
 
  cancel(): void {
    this.credentialTemplate = new CredentialTemplate();
    this.credentialTemplateDialogVisible = false;
  }

  credentialIssued(): void {
    this.offerCredentialDialogVisible = false;
  }

  cancelOcaTemplate(): void {
    this.ocaCredentialTemplateDialogVisible = false;
  }

  saveOcaTemplate(): void {
    if (this.ocaEditor) {
      this.credentialTemplate.ocaForm = this.ocaEditor?.ocaForm;
      this.credentialTemplate.ocaForm.saveLanguage(this.ocaEditor?.currentLanguage);
      this.credentialTemplate.name = this.credentialTemplate.anoncred.name;
      this.credentialTemplate.description = '';
      if (this.credentialTemplate.isNew) {
        this.credentialTemplateService.create(this.credentialTemplate).pipe(takeUntil(this.ngUnsubscribe)).subscribe(credentialTemplate => {
          this.credentialTemplates.push(credentialTemplate);
          this.credentialTemplates = [...this.credentialTemplates];
          this.ocaCredentialTemplateDialogVisible = false;
        });
      } else {
        this.credentialTemplate.name = this.credentialTemplate.anoncred.name;
        this.credentialTemplate.description = '';
        this.credentialTemplateService.update(this.credentialTemplate).pipe(takeUntil(this.ngUnsubscribe)).subscribe(credentialTemplate => {
          const index = this.credentialTemplates.findIndex((t) => t.id === this.credentialTemplate.id);
          if (index !== -1) this.credentialTemplates[index] = this.credentialTemplate;
          this.credentialTemplates = [...this.credentialTemplates];
          this.ocaCredentialTemplateDialogVisible = false;
        });
      }
    }
  }

  save(): void {
    if (this.agentTemplate == null) return;
    let agentTemplate = this.agentTemplate;
    if (!this.anoncredForm) return;
    if (!this.anoncredForm.validate()) return;
    this.blocked = true;

    let createSchemaRequest = new CreateSchemaRequest();
    createSchemaRequest.name = this.credentialTemplate.anoncred.name;
    createSchemaRequest.version = this.credentialTemplate.anoncred.version;
    createSchemaRequest.attributes = this.credentialTemplate.anoncred.attributeNames;
    
    this.schemaService.create(agentTemplate, createSchemaRequest).pipe(takeUntil(this.ngUnsubscribe)).subscribe({ next: (createSchemaResponse: CreateSchemaResponse) => {
      let schemaVersionBackup = createSchemaResponse.schema.version;
      this.credentialTemplate.anoncred = createSchemaResponse.schema.clone();
      let createCredentialDefinitionRequest = new CreateCredentialDefinitionRequest();
      createCredentialDefinitionRequest.supportRevocation = this.credentialTemplate.revocable;
      createCredentialDefinitionRequest.revocationRegistrySize = this.credentialTemplate.revocationRegistrySize;
      createCredentialDefinitionRequest.schemaId = createSchemaResponse.schemaId;
      createCredentialDefinitionRequest.tag = this.credentialTemplate.credentialDefinition?.tag || '';
      
      this.credentialDefinitionService.create(agentTemplate, createCredentialDefinitionRequest).pipe(takeUntil(this.ngUnsubscribe)).subscribe({ next: (response: string) => {
        let credentialDefinition = this.credentialTemplate.credentialDefinition;
        if (credentialDefinition) {
          credentialDefinition.id = response;
          credentialDefinition.schemaId = createSchemaResponse.schemaId;
          this.credentialTemplate.anoncred.version = schemaVersionBackup;
          this.credentialTemplate.name = this.credentialTemplate.anoncred.name;
          this.credentialTemplateService.create(this.credentialTemplate).pipe(takeUntil(this.ngUnsubscribe)).subscribe({ next: credentialTemplate => {
            this.credentialTemplates.push(credentialTemplate);
            this.credentialTemplates = [...this.credentialTemplates];
            this.credentialTemplateDialogVisible = false;
            this.blocked = false;
          },
          error: () => {
            this.blocked = false;
          }});
        }
      },
      error: () => {
        this.blocked = false;
      }});
    },
    error: () => {
      this.blocked = false;
    }});
  }

  createNewTemplateVersion(index: number): void {
    let credentialTemplate = this.credentialTemplates[index];
    this.credentialTemplate = credentialTemplate.clone();
    this.credentialTemplate.id = '';
    this.credentialTemplate.anoncred.id = '';
    this.credentialTemplate.credentialDefinition = new CredentialDefinition();
    this.credentialTemplate.credentialDefinition.tag = credentialTemplate.credentialDefinition.tag;
    this.newVersion = true;
    this.confirmLabel = this.translate.instant('CreateLabel');
    this.credentialTemplateDialogVisible = true;
  }

  deleteTemplate(index: number): void {
    this.confirmationService.confirm({
      message: this.translate.instant('DeleteCredentialTemplateConfirmation'),
      acceptLabel: this.translate.instant('YesLabel'),
      rejectLabel: this.translate.instant('NoLabel'),
      accept: () => {
        this.credentialTemplateService.delete(this.credentialTemplates[index]).pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
          this.credentialTemplates.splice(index, 1);
        });
      }
    });
  }

  offerCredential(index: number): void {
    this.credentialTemplate = this.credentialTemplates[index];
    this.credentialDefinition = this.credentialTemplate.credentialDefinition;
    this.offerLinkVisible = false;
    this.agentTemplateService.get(this.credentialTemplate.agentTemplateId).pipe(takeUntil(this.ngUnsubscribe)).subscribe((agentTemplate) => {
      this.agentTemplate = agentTemplate;
      this.offerCredentialDialogVisible = true; 
    });
  }

  publishCredential(index: number): void {
    this.credentialTemplate = this.credentialTemplates[index];
    this.offerCredentialDialogVisible = true; 
  }

  editOcaTemplate(index: number): void {
    this.credentialTemplate = _.cloneDeep(this.credentialTemplates[index]);
    this.ocaCredentialTemplateDialogVisible = true;
  }

  editTemplate(index: number): void {
    this.credentialTemplate = this.credentialTemplates[index];
    this.credentialTemplateViewDialogVisible = true;
  }

  close(): void {
    this.credentialTemplateViewDialogVisible = false;
  }

  cancelCredentialOffer(): void {
    this.offerCredentialDialogVisible = false;
  }

  createOfferLink(): void {
    if (this.credentialOffer?.isValid()) {
      this.credentialOffer?.offerCredential(); 
      this.offerLinkVisible = true;
    }
  }
}