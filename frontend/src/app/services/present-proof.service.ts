import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { PresentationExchange } from '../models/presentation-exchange';
import { PresentationRequest } from '../models/presentation-request';
import { Restriction } from '../models/restriction';
import { RestrictionType } from '../models/restriction-type.enum';
import { AgentTemplate } from '../models/agent-template';

@Injectable()
export class PresentProofService {

  constructor(private http: HttpClient) {
  }

  send(agent: AgentTemplate, presentationRequest: PresentationRequest): Observable<PresentationExchange> {
    let subject = new Subject<PresentationExchange>();
    const proofRequest: any = {
      name: presentationRequest.proofRequest.name,
      version: presentationRequest.proofRequest.version,
      requested_attributes: {},
      requested_predicates: {}
    };
    for (const requestedAttribute of presentationRequest.proofRequest.requestedAttributes) {
      if (requestedAttribute.id === '' && requestedAttribute.name === '' && !requestedAttribute.names) continue;
      if (requestedAttribute.name !== '') {
        proofRequest.requested_attributes[requestedAttribute.id] = {
          name: requestedAttribute.name,
          restrictions: this.generateRestrictions(requestedAttribute.restrictions)
        };
      } else if (requestedAttribute.names.length > 0) {
        let newNames = [];
        for (const name of requestedAttribute.names) {
          if (name && name !== '') newNames.push(name);
        }
        proofRequest.requested_attributes[requestedAttribute.id] = {
          names: newNames,
          restrictions: this.generateRestrictions(requestedAttribute.restrictions)
        };
      }
    }
    for (const requestedPredicated of presentationRequest.proofRequest.requestedPredicates) {
      if (requestedPredicated.id === '' && requestedPredicated.name === '') continue;
      proofRequest.requested_predicates[requestedPredicated.id] = {
        name: requestedPredicated.name,
        p_type: requestedPredicated.condition,
        p_value: requestedPredicated.value ? parseInt(requestedPredicated.value + '') : 0,
        restrictions: this.generateRestrictions(requestedPredicated.restrictions)
      };
    }
    if (presentationRequest.proofRequest.nonRevoked.isDefine) {
      proofRequest.non_revoked = presentationRequest.proofRequest.nonRevoked.toPlainObject();
    }
    const header = agent.apiKey ? new HttpHeaders({'x-api-key': agent.apiKey}) : new HttpHeaders();
    this.http.post<any>(`${agent.url}/present-proof/send-request`, {
      connection_id: presentationRequest.connectionId,
      comment: presentationRequest.comment,
      proof_request: proofRequest,
      trace: presentationRequest.trace
     }, { headers: header }).subscribe(
        dto => {
            subject.next(PresentationExchange.fromDto(dto));
        },
        err => console.log('HTTP Error', err)
    );
    return subject.asObservable();
  }

  getPresentationExchange(agent: AgentTemplate, id: string): Observable<PresentationExchange> {
    const header = agent.apiKey ? new HttpHeaders({'x-api-key': agent.apiKey}) : new HttpHeaders();
    return this.http.get<any>(`${agent.url}/present-proof/records/${id}`, { headers: header }).pipe(map(dto => {
      return PresentationExchange.fromDto(dto);
    }));
  }

  verify(agent: AgentTemplate, id: string): Observable<PresentationExchange> {
    let subject = new Subject<PresentationExchange>();
    const header = agent.apiKey ? new HttpHeaders({'x-api-key': agent.apiKey}) : new HttpHeaders();
    this.http.post<any>(`${agent.url}/present-proof/records/${id}/verify-presentation`, {}, { headers: header }).subscribe(
        dto => {
            subject.next(PresentationExchange.fromDto(dto));
        },
        err => console.log('HTTP Error', err)
    );
    return subject.asObservable();
  }

  private generateRestrictions(restrictions: Restriction[]): any {
    let restric: any = [];
    for (const requestedPredicated of restrictions) {
      let temp: any = {};
      if (requestedPredicated.type === RestrictionType.CredentialDefinitionId) temp['cred_def_id'] = requestedPredicated.value;
      restric.push(temp);
    }
    return restric;
  }
}