import * as _ from 'lodash';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom, Subject, takeUntil } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { AgentTemplate } from '../models/agent-template';
import { AgentTemplateService } from '../services/agent-template.service';
import { TranslateService } from '@ngx-translate/core';
import { AgentComponent } from './agent.component';

@Component({
  selector: 'agent-template',
  templateUrl: './agent-template.component.html',
  styleUrls: ['./agent-template.component.css']
})
export class AgentTemplateComponent implements OnInit, OnDestroy {

  agentTemplates: AgentTemplate[] = [];

  agentTemplate: AgentTemplate = new AgentTemplate();

  agentTemplateIndex: number = -1;

  agentTemplateDialogVisible: boolean = false;

  issueCredentialDialogVisible: boolean = false;

  blocked: boolean = false;

  confirmLabel: string = 'Accept';

  @ViewChild('agent') agentForm: AgentComponent | null = null;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  private organizationId: string | null = null;
   
  constructor(private readonly route: ActivatedRoute, 
              private readonly confirmationService: ConfirmationService,
              private readonly agentTemplateService: AgentTemplateService,
              private readonly translate: TranslateService) { 
  }

  async ngOnInit(): Promise<void> {
    this.route.parent?.paramMap.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
      let organizationId = params.get('id');
      if (organizationId) {
        this.agentTemplateService.getAllByOrganization(organizationId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(agentTemplates => {
          this.organizationId = organizationId;
          this.agentTemplates = agentTemplates;
        });
      }
    });
    await lastValueFrom(this.translate.get('Translation'));
  }

  ngOnDestroy(): any {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  createTemplate(): void {
    this.agentTemplate = new AgentTemplate();
    this.agentTemplate.organizationId = this.organizationId || '';
    this.confirmLabel = this.translate.instant('CreateLabel');
    this.agentTemplateDialogVisible = true;
  }

  editTemplate(index: number): void {
    this.agentTemplate = _.cloneDeep(this.agentTemplates[index]);
    this.agentTemplateIndex = index;
    this.confirmLabel = this.translate.instant('SaveLabel');
    this.agentTemplateDialogVisible = true;
  }

  showIssueCredentials(index: number): void {
    this.agentTemplate = _.cloneDeep(this.agentTemplates[index]);
    this.agentTemplateIndex = index;
    this.issueCredentialDialogVisible = true;
  }
 
  cancel(): void {
    this.agentTemplate = new AgentTemplate();
    this.agentTemplateDialogVisible = false;
  }

  closeIssueCredential(): void {
    this.issueCredentialDialogVisible = false;
  }

  save(): void {
    if (!this.agentForm) return;
    if (!this.agentForm.validate()) return;
    this.blocked = true;
    if (this.agentTemplate.id === '') {
      this.agentTemplateService.create(this.agentTemplate).pipe(takeUntil(this.ngUnsubscribe)).subscribe(agentTemplate => {
        this.agentTemplates.push(agentTemplate);
        this.agentTemplates[this.agentTemplateIndex] = this.agentTemplate;
        this.agentTemplates = [...this.agentTemplates];
        this.agentTemplateDialogVisible = false;
      });
    } else {
      this.agentTemplateService.update(this.agentTemplate).pipe(takeUntil(this.ngUnsubscribe)).subscribe(agentTemplate => {
        this.agentTemplates[this.agentTemplateIndex] = agentTemplate;
        this.agentTemplates = [...this.agentTemplates];
        this.agentTemplateDialogVisible = false;
      });
    }
    this.blocked = false;
  }

  deleteTemplate(index: number): void {
    this.confirmationService.confirm({
      message: this.translate.instant('DeleteAgentTemplateConfirmation'),
      acceptLabel: this.translate.instant('YesLabel'),
      rejectLabel: this.translate.instant('NoLabel'),
      accept: () => {
        this.agentTemplateService.delete(this.agentTemplates[index]).pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
          this.agentTemplates.splice(index, 1);
        });
      }
    });
  }
}