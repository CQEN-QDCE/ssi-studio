import * as _ from 'lodash';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { lastValueFrom, Subject, takeUntil } from 'rxjs';
import { ProofRequest } from '../models/proof-request';
import { VerificationTemplate } from '../models/verification-template';
import { VerificationTemplateService } from '../services/verification-template.service';
import { RequestedAttribute } from '../models/requested-attribute';
import { RequestedPredicate } from '../models/requested-predicate';
import { AgentTemplate } from '../models/agent-template';
import { AgentTemplateService } from '../services/agent-template.service';
import { TranslateService } from '@ngx-translate/core';
import { VerificationTemplateEditorComponent } from './verification-template-editor.component';

@Component({
  selector: 'verification-template',
  templateUrl: './verification-template.component.html',
  styleUrls: ['./verification-template.component.css']
})
export class VerificationTemplateComponent implements OnInit, OnDestroy {

    verificationTemplates: VerificationTemplate[] = [];

    verificationTemplate: VerificationTemplate = new VerificationTemplate();

    verificationTemplateIndex: number = -1;

    saveLabel: string = 'dfvdv';

    @ViewChild('editor') editor: VerificationTemplateEditorComponent | null = null;

    verificationTemplateDialogVisible: boolean = false;

    requestVerificationDialogVisible: boolean = false;

    proofRequest: ProofRequest| null = null;

    agentTemplate: AgentTemplate = new AgentTemplate();

    private organizationId: string | null = null;

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    
    constructor(private readonly route: ActivatedRoute, 
                private readonly confirmationService: ConfirmationService,
                private readonly agentTemplateService: AgentTemplateService,
                private readonly verificationTemplateService: VerificationTemplateService,
                private readonly translate: TranslateService) { 
    }

    async ngOnInit(): Promise<void> {
      this.route.parent?.paramMap.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
        let organizationId = params.get('id');
        if (organizationId) {
            this.verificationTemplateService.getAllByOrganization(organizationId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(verificationTemplates => {
              this.organizationId = organizationId;
              this.verificationTemplates = verificationTemplates;
            });
        }
      })
      await lastValueFrom(this.translate.get('Translation'));
    }

    ngOnDestroy(): any {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    create(): void {
      this.saveLabel = this.translate.instant('CreateLabel');
      this.verificationTemplate = new VerificationTemplate();
      this.verificationTemplate.organizationId = this.organizationId || '';
      this.verificationTemplateDialogVisible = true;
    }

    close(): void {
      this.verificationTemplateDialogVisible = false;
    }

    save(): void {
      if (!this.editor) return;
      if (!this.editor.validate()) return;
      if (this.verificationTemplate.isNew) {
        this.verificationTemplateService.create(this.verificationTemplate).pipe(takeUntil(this.ngUnsubscribe)).subscribe(verificationTemplate => {
          this.verificationTemplates.push(verificationTemplate);
          this.verificationTemplates[this.verificationTemplateIndex] = this.verificationTemplate;
          this.verificationTemplates = [...this.verificationTemplates];
          this.verificationTemplateDialogVisible = false;
        });
      } else {
        this.verificationTemplateService.update(this.verificationTemplate).pipe(takeUntil(this.ngUnsubscribe)).subscribe(verificationTemplate => {
          this.verificationTemplates[this.verificationTemplateIndex] = this.verificationTemplate;
          this.verificationTemplates = [...this.verificationTemplates];
          this.verificationTemplateDialogVisible = false;
        });
      }
    }

    cancel(): void {
      this.verificationTemplate = new VerificationTemplate();
      this.verificationTemplateDialogVisible = false;
    }
  
    editTemplate(index: number): void {
      this.verificationTemplateIndex = index;
      this.verificationTemplate = _.cloneDeep(this.verificationTemplates[index]);
      this.saveLabel = this.translate.instant('SaveLabel');
      this.verificationTemplateDialogVisible = true;
    }

    deleteTemplate(index: number): void {
      this.confirmationService.confirm({
        message: this.translate.instant('DeleteVerificationTemplateConfirmation'),
        acceptLabel: this.translate.instant('YesLabel'),
        rejectLabel: this.translate.instant('NoLabel'),
        accept: () => {
          this.verificationTemplateService.delete(this.verificationTemplates[index]).pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
            this.verificationTemplates.splice(index, 1);
          });
        }
      });
    }

    requestProof(index: number): void {
      let verificationTemplate = this.verificationTemplates[index];
      this.agentTemplateService.get(verificationTemplate.agentTemplateId).pipe(takeUntil(this.ngUnsubscribe)).subscribe((agentTemplate) => {
        this.agentTemplate = agentTemplate;
      
      let proofRequest = new ProofRequest();

      proofRequest.name = verificationTemplate.name;
      proofRequest.version = '1.0';

      let attributeReferentCount = 1;
      let predicateReferentCount = 1;
      for (const credentialRequest of verificationTemplate.credentialRequests) {
        let requestedAttribut = new RequestedAttribute();
        requestedAttribut.id = 'attribute_referent_' + attributeReferentCount;
        attributeReferentCount++;
        requestedAttribut.name = '';
        requestedAttribut.names = [];
        if (credentialRequest.requestedAttributes.length > 1) {
          for (const attribute of credentialRequest.requestedAttributes) requestedAttribut.names.push(attribute.name);
        } else if (credentialRequest.requestedAttributes.length === 1) {
          requestedAttribut.name = credentialRequest.requestedAttributes[0].name;
        }
        requestedAttribut.restrictions = credentialRequest.restrictions;
        proofRequest.requestedAttributes.push(requestedAttribut);
        for (const predicate of credentialRequest.requestedPredicates) {
          let requestedPredicate = new RequestedPredicate();
          requestedPredicate.id = 'predicate_referent_' + predicateReferentCount;
          requestedPredicate.name = predicate.name;
          requestedPredicate.condition = predicate.condition;
          requestedPredicate.value = predicate.value;
          requestedPredicate.restrictions = credentialRequest.restrictions;
          predicateReferentCount++;
          proofRequest.requestedPredicates.push(requestedPredicate);
        }
        this.proofRequest = proofRequest;
      }
      this.requestVerificationDialogVisible = true;
    });
  }
}