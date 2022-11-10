import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { CreateSchemaRequest } from '../models/create-schema-request';
import { CreateSchemaResponse } from '../models/create-schema-response';
import { SearchSchemaRequest } from '../models/search-schema-request';
import { Schema } from '../models/schema';
import { AgentTemplate } from '../models/agent-template';

@Injectable()
export class SchemaService {

  constructor(private http: HttpClient) {
  }

  create(agent: AgentTemplate, createSchemaRequest: CreateSchemaRequest): Observable<CreateSchemaResponse> {
    let subject = new Subject<CreateSchemaResponse>();
    this.http.post<any>(`${agent.url}/schemas`, { 
      schema_name: createSchemaRequest.name,
      schema_version: createSchemaRequest.version,
      attributes: createSchemaRequest.attributes
    }).subscribe(
      { 
        next: (dto) => {
          const schema = new Schema();
          schema.id = dto.schema.id;
          schema.name = dto.schema.name;
          schema.version = dto.schema.version;
          schema.sequenceNumber = dto.schema.seqNo;
          schema.attributeNames = dto.schema.attrNames;
            subject.next({
              schemaId: dto.schema_id,
              schema: schema
            });
        },
        error: (error) => {
            subject.error(error);
        }
      }
    );
    return subject.asObservable();
  }

  search(agent: AgentTemplate, request: SearchSchemaRequest = new SearchSchemaRequest()): Observable<string[]> {
    let query: string = '';
    if (request.schemaId) {
      query += query === '' ? '?' : '&';
      query += 'schema_id=' + request.schemaId;      
    }
    if (request.schemaIssuerDid) {
      query += query === '' ? '?' : '&';
      query += 'schema_issuer_did=' + request.schemaIssuerDid;      
    }
    if (request.schemaName) {
      query += query === '' ? '?' : '&';
      query += 'schema_name=' + request.schemaName;      
    }
    if (request.schemaVersion) {
      query += query === '' ? '?' : '&';
      query += 'schema_version=' + request.schemaVersion;      
    }
    return this.http.get<any>(`${agent.url}/schemas/created${query}`).pipe(map(dto => {
      return dto.schema_ids;
    }));
  }

  get(agent: AgentTemplate, schemaId: string): Observable<Schema> {
    return this.http.get<any>(`${agent.url}/schemas/${schemaId}`).pipe(map(dto => {
      const schema = new Schema();
      schema.id = dto.schema.id;
      schema.name = dto.schema.name;
      schema.version = dto.schema.version;
      schema.sequenceNumber = dto.schema.sequenceNumber;
      schema.attributeNames = dto.schema.attributeNames ? dto.schema.attributeNames : dto.schema.attrNames;
      return schema;
    }));
  }

}
