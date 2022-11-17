import { AfterViewInit, ChangeDetectorRef, Component, forwardRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AgentTemplate } from '../models/agent-template';
import { VerificationTemplate } from '../models/verification-template';
import { VerificationRequestComponent } from '../proof/verification-request.component';
import { AgentTemplateService } from '../services/agent-template.service';

export const verificationTemplateEditorValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => VerificationTemplateEditorComponent),
  multi: true
};
@Component({
  selector: 'verification-template-editor',
  templateUrl: './verification-template-editor.component.html',
  styleUrls: ['./verification-template-editor.component.css'],
  providers: [verificationTemplateEditorValueAccessor]
})
export class VerificationTemplateEditorComponent implements OnInit, OnDestroy, AfterViewInit {

    verificationTemplate: VerificationTemplate = new VerificationTemplate();

    agentTemplates: AgentTemplate[] = [];

    agentTemplatesInit: boolean = false;

    currentAgentTemplate: AgentTemplate = new AgentTemplate();
    
    @ViewChild('verificationForm') verificationForm: NgForm | null = null;

    @ViewChild('verificationRequest') verificationRequest: VerificationRequestComponent | null = null;
    
    private ngUnsubscribe: Subject<void> = new Subject<void>();
    
    onModelChange: Function = () => { };

    constructor(private readonly cd: ChangeDetectorRef, 
                private readonly route: ActivatedRoute, 
                private readonly agentTemplateService: AgentTemplateService) { 
    }

    ngOnInit(): void {
      this.initAgentTemplates();
      this.initCurrentAgentTemplate();
      
    }

    ngAfterViewInit(): void {
      this.resetControls();
    }

    private initAgentTemplates(): void {
      if (this.agentTemplatesInit) return;
      this.route.parent?.paramMap.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
        let laboratoryId = params.get('id');
        if (laboratoryId) {
          this.agentTemplateService.getAllByLaboratory(laboratoryId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(agentTemplates => {
            this.agentTemplates = agentTemplates;
            this.agentTemplatesInit = true;
            this.initCurrentAgentTemplate();
            this.resetControls();
          });
        }
      })
    }

    private initCurrentAgentTemplate(): void {
      for (const agentTemplate of this.agentTemplates) {
        if (agentTemplate.id === this.verificationTemplate.agentTemplateId) {
          this.currentAgentTemplate = agentTemplate;
        }
      }
    }

    ngOnDestroy(): any {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    changeAgentTemplate(value: AgentTemplate): void {
      this.verificationTemplate.agentTemplateId = value.id;
      this.onModelChange(this.verificationTemplate);
    }

    onTouched = () => {
    };

    writeValue(verificationTemplate: VerificationTemplate): void {
      this.verificationTemplate = verificationTemplate || new VerificationTemplate();
      this.initAgentTemplates();
      this.initCurrentAgentTemplate();
      this.cd.markForCheck();
  }

  registerOnChange(fn: (checked: boolean) => void): void {
      this.onModelChange = fn;    
  }

  registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
  }

  private resetControls(): void {
    if (!this.verificationForm) return;
    for (const control of Object.keys(this.verificationForm.controls)) {
      this.verificationForm.controls[control].markAsPristine();
      this.verificationForm.controls[control].markAsUntouched();
    }
  }

  validate(): boolean {
    if (!this.verificationForm) return false;
    if (!this.verificationRequest) return false;
    if (!this.verificationRequest.validate()) return false;
    if (this.verificationForm.invalid) {
      for (const control of Object.keys(this.verificationForm.controls)) {
        this.verificationForm.controls[control].markAsTouched();
        this.verificationForm.controls[control].markAsDirty();
      }
      return false;
    }
    return true;
  }
}