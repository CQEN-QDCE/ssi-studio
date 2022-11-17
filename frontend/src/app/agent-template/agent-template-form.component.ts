import * as _ from 'lodash';
import { ChangeDetectorRef, Component, forwardRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AgentTemplate } from '../models/agent-template';
import { NgForm, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ServerService } from '../services/server.service';
import { AgentConfig } from '../models/agent-config';

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

  agentConfig: AgentConfig = new AgentConfig();

  onModelChange: Function = () => { };

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  
  constructor(private readonly cd: ChangeDetectorRef, private serverService: ServerService) { 
  }

  ngOnInit(): void {
    this.fetchConfig();
  }

  ngOnDestroy(): any {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onTouched = () => {
  };

  writeValue(agentTemplate: AgentTemplate): void {
    this.agentTemplate = agentTemplate || new AgentTemplate();
    this.fetchConfig();
    this.cd.markForCheck();
  }

  registerOnChange(fn: (checked: boolean) => void): void {
    this.onModelChange = fn;    
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  validate(): boolean {
    if (!this.agentForm) return false;
    if (this.agentForm.invalid) {
      for (const control of Object.keys(this.agentForm.controls)) {
        this.agentForm.controls[control].markAsTouched();
        this.agentForm.controls[control].markAsDirty();
      }
      return false;
    }
    return true;
  }

  private fetchConfig(): void {
    if (this.agentTemplate.id && this.agentTemplate.id !== '') {
      this.serverService.fetchConfig(this.agentTemplate).pipe(takeUntil(this.ngUnsubscribe)).subscribe(agentConfig => {
        this.agentConfig = agentConfig;
      });
    }
  }
}