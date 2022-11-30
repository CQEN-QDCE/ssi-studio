import * as _ from 'lodash';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { lastValueFrom, Subject, takeUntil } from 'rxjs';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { AgentTemplate } from '../models/agent-template';
import { AgentTemplateService } from '../services/agent-template.service';
import { TranslateService } from '@ngx-translate/core';
import { AgentComponent } from './agent-template-form.component';

@Component({
  selector: 'agent-template-list',
  templateUrl: './agent-template-list.component.html',
  styleUrls: ['./agent-template-list.component.css']
})
export class AgentTemplateListComponent implements OnInit, OnDestroy {

  agentTemplates: AgentTemplate[] = [];

  agentTemplate: AgentTemplate = new AgentTemplate();

  agentTemplateIndex: number = -1;

  items: MenuItem[] = [];

  agentTemplateDialogVisible: boolean = false;

  issueCredentialDialogVisible: boolean = false;

  blocked: boolean = false;

  confirmLabel: string = 'Accept';

  currentRowIndex: number = -1;

  @ViewChild('agent') agentForm: AgentComponent | null = null;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  private laboratoryId: string | null = null;
   
  constructor(private readonly route: ActivatedRoute, 
              public readonly router: Router,
              private readonly confirmationService: ConfirmationService,
              private readonly agentTemplateService: AgentTemplateService,
              private readonly translate: TranslateService) { 
  }

  async ngOnInit(): Promise<void> {
    this.route.parent?.paramMap.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
      let laboratoryId = params.get('id');
      if (laboratoryId) {
        this.agentTemplateService.getAllByLaboratory(laboratoryId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(agentTemplates => {
          this.laboratoryId = laboratoryId;
          this.agentTemplates = agentTemplates;
        });
      }
    });
    this.initMenuItems();
  }

  ngOnDestroy(): any {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private initMenuItems(): void {
    this.items = [{
      label: 'Update',
      icon: 'pi pi-pencil',
      command: (rowIndex: number) => {
        this.editTemplate(this.currentRowIndex);
      }
  },
  {
      label: 'Delete',
      icon: 'fa fa-trash',
      command: (rowIndex: number) => {
        this.deleteTemplate(this.currentRowIndex);
      }
  }
  ];
  }

  setCurrentRow(rowIndex: number): void {
    this.currentRowIndex = rowIndex;
  }

  create(): void {
    this.agentTemplate = new AgentTemplate();
    this.agentTemplate.laboratoryId = this.laboratoryId || '';
    this.confirmLabel = this.translate.instant('CreateLabel');
    this.agentTemplateDialogVisible = true;
  }

  navigate(index: number): void {
    const agentTemplate = this.agentTemplates[index];
    const url = this.router.url + '/' + agentTemplate.id;
    this.router.navigateByUrl(url);
  }

  editTemplate(index: number): void {
    this.agentTemplate = _.cloneDeep(this.agentTemplates[index]);
    this.agentTemplateIndex = index;
    this.confirmLabel = this.translate.instant('SaveLabel');
    this.agentTemplateDialogVisible = true;
  }
 
  cancel(): void {
    this.agentTemplate = new AgentTemplate();
    this.agentTemplateDialogVisible = false;
  }

  async save(): Promise<void> {
    if (!this.agentForm) return;
    const isValid = await this.agentForm.validate();
    if (!isValid) return;
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