import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { AgentTemplate } from '../models/agent-template';
import { CreateSchemaRequest } from '../models/create-schema-request';
import { CreateSchemaResponse } from '../models/create-schema-response';
import { Schema } from '../models/schema';
import { SchemaId } from '../models/schema-id';
import { SchemaService } from '../services/schema.service';

@Component({
  selector: 'anoncred-schema-editor',
  templateUrl: './anoncred-schema-editor.component.html',
  styleUrls: ['./anoncred-schema-editor.component.css']
})
export class AnonCredSchemaEditorComponent implements OnInit {

  @ViewChild('dt') dt: Table | null = null;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public schemaIds: SchemaId[] = [];

  public editSchemaDialogVisible: boolean = false;

  public curentSchema: Schema  = new Schema();

  public schemaAttributes: SchemaAttribute[] = [];

  agentTemplate: AgentTemplate | null = null;

  @Input('agentTemplate') 
  set setAgentTemplate(value: AgentTemplate | null) {
    this.agentTemplate = value;
  };
  
  constructor(private schemaService: SchemaService) { 
  }

  ngOnInit(): void {
    if (this.agentTemplate == null) return;
    let agentTemplate = this.agentTemplate;
    this.schemaService.search(agentTemplate).pipe(takeUntil(this.ngUnsubscribe)).subscribe((schemaIds: string[]) => {
      this.schemaIds = [];
      for (const schemaId of schemaIds) {
        this.schemaIds.push(SchemaId.parse(schemaId));
      }
    });
  }

  editSchema(schemaId: SchemaId): void {
    if (this.agentTemplate == null) return;
    let agentTemplate = this.agentTemplate;
    this.schemaService.get(agentTemplate, schemaId.toString()).pipe(takeUntil(this.ngUnsubscribe)).subscribe((schema: Schema) => {
      this.curentSchema = schema;
      this.schemaAttributes = [];
      let i = 1;
      for (const attributeName of schema.attributeNames) {
        this.schemaAttributes.push({id: i, name: attributeName});
        i++;
      }
      this.editSchemaDialogVisible = true;
    });
  }

  addSchema(): void {
    this.curentSchema = new Schema();
    this.schemaAttributes = [];
    this.editSchemaDialogVisible = true;
  }

  addAttribute(): void {
    let i = 0;
    for (const schemaAttribute of this.schemaAttributes) if (schemaAttribute.id > i) i = schemaAttribute.id;
    let test = {id: i + 1, name: ''};
    this.schemaAttributes.push(test);
    this.dt?.initRowEdit(test);
  }

  editAttribute(rowIndex: number, name: string): void {
    let bla = 1;
  }

  saveAttribute(rowIndex: number, name: string): void {
    let bla = 1;
  }

  cancelAttribute(rowIndex: number, name: string): void {
    let bla = 1;
  }

  deleteAttribute(rowIndex: number, name: string): void {
  }

  cancelEditSchema(): void {
    this.curentSchema  = new Schema();
    this.editSchemaDialogVisible = false;
  }

  acceptEditSchema(): void {
    if (this.agentTemplate == null) return;
    let agentTemplate = this.agentTemplate;
    let request = new CreateSchemaRequest();
    request.name = this.curentSchema.name;
    request.version = this.curentSchema.version;
    for (const schemaAttribute of this.schemaAttributes) {
      request.attributes.push(schemaAttribute.name);
    }
    
    this.schemaService.create(agentTemplate, request).pipe(takeUntil(this.ngUnsubscribe)).subscribe((response: CreateSchemaResponse) => {
      this.curentSchema  = new Schema();
      this.editSchemaDialogVisible = false;
      this.ngOnInit();
    });
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
