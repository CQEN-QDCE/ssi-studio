import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { CreateCredentialDefinitionRequest } from '../models/create-credential-definition-request';
import { CredentialDefinitionQuery } from '../models/credential-definition-query';
import { CredentialDefinition } from '../models/credential-definition';
import { AgentTemplate } from '../models/agent-template';

@Injectable()
export class CredentialDefinitionService {

  constructor(private http: HttpClient) {
  }

  create(agent: AgentTemplate, request: CreateCredentialDefinitionRequest): Observable<string> {
    let subject = new Subject<string>();
    this.http.post<any>(`${agent.url}/credential-definitions`, { 
      revocation_registry_size: request.revocationRegistrySize,
      schema_id: request.schemaId,
      support_revocation: request.supportRevocation,
      tag: request.tag
    }).subscribe(
        { 
          next: (dto) => {
            subject.next(dto.credential_definition_id);
          },
          error: (error) => {
              subject.error(error);
          }
        }
    );
    return subject.asObservable();
  }

  search(agent: AgentTemplate, query: CredentialDefinitionQuery = new CredentialDefinitionQuery()): Observable<string[]> {
    let queryParms: string = '';
    if (query.credentialDefinitionId) {
      queryParms += queryParms === '' ? '?' : '&';
      queryParms += 'cred_def_id=' + query.schemaId;      
    }
    if (query.issuerDid) {
      queryParms += queryParms === '' ? '?' : '&';
      queryParms += 'issuer_did=' + query.schemaId;      
    }
    if (query.schemaId) {
      queryParms += queryParms === '' ? '?' : '&';
      queryParms += 'schema_id=' + query.schemaId;      
    }
    if (query.schemaIssuerDid) {
      queryParms += queryParms === '' ? '?' : '&';
      queryParms += 'schema_issuer_did=' + query.schemaIssuerDid;      
    }
    if (query.schemaName) {
      queryParms += queryParms === '' ? '?' : '&';
      queryParms += 'schema_name=' + query.schemaName;      
    }
    if (query.schemaVersion) {
      queryParms += queryParms === '' ? '?' : '&';
      queryParms += 'schema_version=' + query.schemaVersion;      
    }
    return this.http.get<any>(`${agent.url}/credential-definitions/created${queryParms}`).pipe(map(dto => {
      return dto.credential_definition_ids;
    }));
  }

  get(agent: AgentTemplate, credentialDefinitionId: string): Observable<CredentialDefinition> {
    return this.http.get<any>(`${agent.url}/credential-definitions/${credentialDefinitionId}`).pipe(map(dto => {
      const credentialDefinition = new CredentialDefinition();
      credentialDefinition.id = dto.credential_definition.id;
      credentialDefinition.schemaId = dto.credential_definition.schemaId;
      credentialDefinition.tag = dto.credential_definition.tag;
      credentialDefinition.version = dto.credential_definition.version;
      credentialDefinition.type = dto.credential_definition.type;
      credentialDefinition.value = dto.credential_definition.value;
      return credentialDefinition;
    }));
  }

}