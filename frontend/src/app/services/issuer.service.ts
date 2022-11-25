import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { CredentialProposalRequest } from '../models/credential-proposal-request';
import { CredentialProposalResponse } from '../models/credential-proposal-response';
import { AgentTemplate } from '../models/agent-template';
import { Poller } from './poller.service';

@Injectable()
export class IssuerService {

  constructor(private http: HttpClient, private poller: Poller) {
  }

  getCredentialExchange(agent: AgentTemplate, id: string): Observable<CredentialProposalResponse> {
    const header = agent.apiKey ? new HttpHeaders({'x-api-key': agent.apiKey}) : new HttpHeaders();
    return this.http.get<any>(`${agent.url}/issue-credential/records/${id}`, { headers: header }).pipe(map(dto => {
      return {
        autoIssue: dto.auto_issue,
        autoOffer: dto.auto_offer,
        autoRemove: dto.auto_remove,
        connectionId: dto.connection_id,
        createdAt: dto.created_at,
        credential: dto.credential,
        credentialDefinitionId: dto.credential_definition_id,
        credentialExchangeId: dto.credential_exchange_id,
        credentialId: dto.credential_id,
        credentialOffer: dto.credential_offer,
        credentialOfferDict: dto.credential_offer_dict,
        credentialProposalDict: dto.credential_proposal_dict,
        credentialRequest: dto.credential_request,
        credentialRequestMetadata: dto.credential_request_metadata,
        errorMessage: dto.error_msg,
        initiator: dto.initiator,
        parentThreadId: dto.parent_thread_id,
        rawCredential: dto.raw_credential,
        revocRegId: dto.revoc_reg_id,
        revocationId: dto.revocation_id,
        role: dto.role,
        schemaId: dto.schema_id,
        state: dto.state,
        threadId: dto.thread_id,
        trace: dto.trace,
        updatedAt: dto.updated_at
      };
    }));
  }

  send(agent: AgentTemplate, credentialProposalRequest: CredentialProposalRequest): Observable<CredentialProposalResponse> {
    let subject = new Subject<CredentialProposalResponse>();
    let attributes: any[] = [];
    for (const attribute of credentialProposalRequest.credentialProposal.attributes) {
      attributes.push({
        "mime-type": attribute.mimeType,
        "name": attribute.name,
        "value": attribute.value
      });
    }
    const header = agent.apiKey ? new HttpHeaders({'x-api-key': agent.apiKey}) : new HttpHeaders();
    this.http.post<any>(`${agent.url}/issue-credential/send`, {
      auto_remove: credentialProposalRequest.autoRemove,
      comment: credentialProposalRequest.comment,
      connection_id: credentialProposalRequest.connectionId,
      cred_def_id: credentialProposalRequest.credentialDefinitionId,
      credential_proposal: {
        "@type": credentialProposalRequest.credentialProposal.type,
        "attributes": attributes
      },
      issuer_did: credentialProposalRequest.issuerDid,
      schema_id: credentialProposalRequest.schemaId,
      schema_issuer_did: credentialProposalRequest.schemaIssuerDid,
      schema_name: credentialProposalRequest.schemaName,
      schema_version: credentialProposalRequest.schemaVersion,
      trace: credentialProposalRequest.trace
    }, { headers: header }).subscribe(
        dto => {
            subject.next({
              autoIssue: dto.auto_issue,
              autoOffer: dto.auto_offer,
              autoRemove: dto.auto_remove,
              connectionId: dto.connection_id,
              createdAt: dto.created_at,
              credential: dto.credential,
              credentialDefinitionId: dto.credential_definition_id,
              credentialExchangeId: dto.credential_exchange_id,
              credentialId: dto.credential_id,
              credentialOffer: dto.credential_offer,
              credentialOfferDict: dto.credential_offer_dict,
              credentialProposalDict: dto.credential_proposal_dict,
              credentialRequest: dto.credential_request,
              credentialRequestMetadata: dto.credential_request_metadata,
              errorMessage: dto.error_msg,
              initiator: dto.initiator,
              parentThreadId: dto.parent_thread_id,
              rawCredential: dto.raw_credential,
              revocRegId: dto.revoc_reg_id,
              revocationId: dto.revocation_id,
              role: dto.role,
              schemaId: dto.schema_id,
              state: dto.state,
              threadId: dto.thread_id,
              trace: dto.trace,
              updatedAt: dto.updated_at
            });
        },
        err => console.log('HTTP Error', err)
    );
    return subject.asObservable();
  }

  waitResponseToOffer(agent: AgentTemplate, credentialExchangeId: string): Observable<CredentialProposalResponse> {
    let subject = new Subject<CredentialProposalResponse>();
    this.poller.startPoll<CredentialProposalResponse>(() => this.getCredentialExchange(agent, credentialExchangeId), 
                                                      (credentialExchange => credentialExchange.state !== 'offer_sent')).subscribe({ next: (credentialExchange: CredentialProposalResponse) => {
      console.log(credentialExchange.state);
      subject.next(credentialExchange);
    },
    error: (error) => {
      subject.error(error);
    }});
    return subject.asObservable();
  }
}