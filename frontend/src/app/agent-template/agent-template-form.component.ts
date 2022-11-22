import * as _ from 'lodash';
import { ChangeDetectorRef, Component, forwardRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { firstValueFrom, lastValueFrom, Subject, takeUntil } from 'rxjs';
import { AgentTemplate } from '../models/agent-template';
import { NgForm, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ServerService } from '../services/server.service';
import { AgentConfig } from '../models/agent-config';
import { AgentTemplateService } from '../services/agent-template.service';

export const agentTemplateEditorValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AgentComponent),
  multi: true
};
@Component({
  selector: 'agent-template-form',
  templateUrl: './agent-template-form.component.html',
  styleUrls: ['./agent-template-form.component.css'],
  providers: [agentTemplateEditorValueAccessor]
})
export class AgentComponent implements OnInit, OnDestroy {

  agentTemplate: AgentTemplate = new AgentTemplate();

  @ViewChild('agentForm') agentForm: NgForm | null = null;

  @ViewChild('agentUrl') agentUrl: any | null = null;

  agentConfig: AgentConfig = new AgentConfig();

  onModelChange: Function = () => { };

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  
  constructor(private readonly cd: ChangeDetectorRef, 
              private serverService: ServerService,
              private readonly agentTemplateService: AgentTemplateService) { 
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): any {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onTouched = () => {
  };

  writeValue(agentTemplate: AgentTemplate): void {
    this.agentTemplate = agentTemplate || new AgentTemplate();
    this.cd.markForCheck();
  }

  registerOnChange(fn: (checked: boolean) => void): void {
    this.onModelChange = fn;    
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  validateUrl(): void {
//    let url = this.agentUrl.nativeElement.value;
//    this.agentTemplateService.findAgentType(url).pipe(takeUntil(this.ngUnsubscribe)).subscribe(agentType => {
//      if (!this.agentForm) return;
//      for (const control of Object.keys(this.agentForm.controls)) {
//        this.agentForm.controls[control].setErrors({ invalid: true });
//      }
//    });
    return;
  }

  async validate(): Promise<boolean> {
    if (!this.agentForm) return false;
    let url = this.agentUrl.nativeElement.value;
    const agentType = await firstValueFrom(this.agentTemplateService.findAgentType(url));
    if (agentType === 'Unknown') {
      for (const control of Object.keys(this.agentForm.controls)) {
        if (control === 'url') this.agentForm.controls[control].setErrors({ invalid: true });
      }
    }
    if (this.agentForm.invalid) {
      for (const control of Object.keys(this.agentForm.controls)) {
        this.agentForm.controls[control].markAsTouched();
        this.agentForm.controls[control].markAsDirty();
      }
      return false;
    }
    return true;
  }
}