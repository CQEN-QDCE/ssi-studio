import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AgentTemplate } from '../models/agent-template';
import { CredentialDefinition } from '../models/credential-definition';
import { Schema } from '../models/schema';
import { AgentTemplateService } from '../services/agent-template.service';

export const anonCredSchemaFormValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AnonCredSchemaFormComponent),
  multi: true
};
@Component({
  selector: 'anoncred-schema-form',
  templateUrl: './anoncred-schema-form.component.html',
  styleUrls: ['./anoncred-schema-form.component.css'],
  providers: [anonCredSchemaFormValueAccessor]
})
export class AnonCredSchemaFormComponent implements OnInit, AfterViewInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  curentSchema: Schema  = new Schema();

  credentialDefinition: CredentialDefinition | null = null;

  revocable: boolean  = false;

  atLeastOneAttribute: boolean  = false;

  agentTemplate: AgentTemplate  = new AgentTemplate();

  newVersion: boolean  = false;

  versionPlaceHolder: string = '';

  revocationRegistrySize: number = 1000;

  schemaAttributes: SchemaAttribute[] = [];

  onModelChange: Function = () => { };

  agentTemplates: AgentTemplate[] = [];

  currentAgentTemplate: AgentTemplate | null = null;

  @Input('credentialDefinition')
  set setCredentialDefinition(value: CredentialDefinition | null) {
    this.credentialDefinition = value;
    this.credentialDefinitionChange.emit(this.credentialDefinition);
  }

  @Output() credentialDefinitionChange = new EventEmitter();

  @Input('revocable')
  set setRevocable(value: boolean) {
    this.revocable = value;
    this.revocableChange.emit(this.revocable);
  }
  @ViewChild('anonCredForm') anonCredForm: NgForm | null = null;
  @Input('agentTemplate')
  set setAgentTemplate(value: AgentTemplate) {
    this.agentTemplate = value;
    this.agentTemplateChange.emit(this.agentTemplate);
  }

  @Input('newVersion')
  set setNewVersion(value: boolean) {
    this.newVersion = value;
    this.isNewVersion();
  }

  @Output() revocableChange = new EventEmitter();

  @Output() agentTemplateChange = new EventEmitter();

  @Input('revocationRegistrySize')
  set setRevocationRegistrySize(value: number) {
    this.revocationRegistrySize = value;
    this.revocationRegistrySizeChange.emit(this.revocationRegistrySize);
  }

  @Output() revocationRegistrySizeChange = new EventEmitter();
  
  constructor(private readonly route: ActivatedRoute, 
              private readonly cd: ChangeDetectorRef, 
              private readonly agentTemplateService: AgentTemplateService) { 
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.route.parent?.paramMap.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
    let organizationId = params.get('id');
    if (organizationId) {
      this.agentTemplateService.getAllByOrganization(organizationId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(agentTemplates => {
        this.agentTemplates = agentTemplates;
        this.resetControls();
      });
    }
    })
  }

  ngAfterViewInit(): void {
    this.resetControls();
  }

  private resetControls(): void {
    if (!this.anonCredForm) return;
    for (const control of Object.keys(this.anonCredForm.controls)) {
      this.anonCredForm.controls[control].markAsPristine();
      this.anonCredForm.controls[control].markAsUntouched();
    }
  }

  validate(): boolean {
    if (!this.anonCredForm) return false;
    if (this.schemaAttributes.length === 0) this.atLeastOneAttribute = true;
    if (this.anonCredForm.invalid) {
      for (const control of Object.keys(this.anonCredForm.controls)) {
        this.anonCredForm.controls[control].markAsTouched();
        this.anonCredForm.controls[control].markAsDirty();
      }
      return false;
    }
    if (this.atLeastOneAttribute) return false;
    return true;
  }

  focusNext(i: number) {
    console.log('next: ' + i);
    let nextElementSiblingId = 'input'+ (i + 1);
    if (i <= this.curentSchema.attributeNames.length) {
      const input = document.querySelector(`#${nextElementSiblingId}`) as HTMLElement | null;
      if (input != null) {
        input.focus();
      }
    }     
  }

  isNewVersion(): void {
    if (this.newVersion) {
      this.versionPlaceHolder = this.curentSchema.version;
      this.curentSchema.version = '';
    } else {

    }
  }

  deleteAttribute(index: number): void {
    this.schemaAttributes.splice(index, 1);
    this.changeAttribute();
  }

  cancelEditSchema(): void {
    this.curentSchema  = new Schema();
  }

  onTouched = () => {
  };

  changeName(value: string): void {
    this.onModelChange(this.curentSchema);
  }

  changeAttribute(): void {
    this.curentSchema.attributeNames = [];
    for (let schemaAttribute of this.schemaAttributes) {
      this.curentSchema.attributeNames.push(schemaAttribute.name);
    }
    if (this.curentSchema.attributeNames.length > 0 && this.curentSchema.attributeNames[this.curentSchema.attributeNames.length - 1] === '') this.curentSchema.attributeNames.pop();
    this.onModelChange(this.curentSchema);
  }

  changeVersion(value: string): void {
    this.onModelChange(this.curentSchema);
  }

  changeTag(value: string): void {
    this.credentialDefinitionChange.emit(this.credentialDefinition);
  }

  changeRevocable(value: boolean): void {
    this.revocableChange.emit(this.revocable);
  }

  changeAgentTemplate(value: AgentTemplate): void {
    this.agentTemplateChange.emit(value);
  }

  changeRegistrySize(value: number): void {
    this.revocationRegistrySizeChange.emit(this.revocationRegistrySize);
  }

  addAttribute2(index: number): void {
    if (index === this.schemaAttributes.length - 1) this.schemaAttributes.push(new SchemaAttribute());
  }
  
  writeValue(schema: Schema): void {
    console.log(JSON.stringify(schema));
      this.curentSchema = schema || new Schema();
      this.schemaAttributes = [];
      if (this.curentSchema.attributeNames.length === 0) {
        this.curentSchema.version = '1.0';
        this.schemaAttributes.push(new SchemaAttribute());
      } else {
        for (const attributeName of this.curentSchema.attributeNames) {
          let schemaAttribute = new SchemaAttribute();
          schemaAttribute.name = attributeName;
          this.schemaAttributes.push(schemaAttribute);
        }
      }
      this.isNewVersion();
      this.cd.markForCheck();
  }

  registerOnChange(fn: (checked: boolean) => void): void {
      this.onModelChange = fn;    
  }

  registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
  }

  selectionChanged(): void {
      this.onModelChange(this.curentSchema);
  }
}

export class SchemaAttribute {

  public id: number;
  public name: string;

  constructor() {
      this.id = 0;
      this.name = '';
  }
}
