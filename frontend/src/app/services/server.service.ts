import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { Connection } from '../models/connection';
import { CreateInvitationRequest } from '../models/create-invitation-request';
import { CreateInvitationResponse } from '../models/create-invitation-response';
import { AgentTemplate } from '../models/agent-template';
import { AgentConfig } from '../models/agent-config';

@Injectable()
export class ServerService {

  constructor(private http: HttpClient) {
  }

  createInvitation(agentTemplate: AgentTemplate, request: CreateInvitationRequest = new CreateInvitationRequest(), autoAccept: boolean = false, multiUse: boolean = false, fromPublicDid: boolean = false, alias: string = ''): Observable<CreateInvitationResponse> {
    let subject = new Subject<CreateInvitationResponse>();
    const header = agentTemplate.apiKey ? new HttpHeaders({'x-api-key': agentTemplate.apiKey}) : new HttpHeaders();
    this.http.post<any>(`${agentTemplate.url}/connections/create-invitation?auto_accept=${autoAccept}&multi_use=${multiUse}&public=${fromPublicDid}&alias=${alias}`, {}, { headers: header }).subscribe(
        res => {
            subject.next({
              connectionId: res.connection_id,
              invitation: res.invitation,
              invitationUrl: res.invitation_url
            });
        },
        err => console.log('HTTP Error', err)
    );
    return subject.asObservable();
  }

  fetchConfig(agentTemplate: AgentTemplate): Observable<AgentConfig> {
    const header = agentTemplate.apiKey ? new HttpHeaders({'x-api-key': agentTemplate.apiKey}) : new HttpHeaders();
    return this.http.get<any>(`${agentTemplate.url}/status/config`, { headers: header }).pipe(map(dto => {
      const agentConfig = new AgentConfig();
      agentConfig.admin.insecureMode = dto.config['admin.admin_insecure_mode'];
      agentConfig.admin.enabled = dto.config['admin.enabled'];
      agentConfig.admin.host = dto.config['admin.host'];
      agentConfig.admin.port = dto.config['admin.port'];
      agentConfig.admin.webhookUrls = dto.config['admin.webhook_urls'];
      agentConfig.admin.clientMaxRequestSize = dto.config['admin.admin_client_max_request_size'];

      agentConfig.debug.autoRespondCredentialProposal = dto.config['debug.auto_respond_credential_proposal'];
      agentConfig.debug.autoRespondCredentialOffer = dto.config['debug.auto_respond_credential_offer'];
      agentConfig.debug.autoRespondCredentialRequest = dto.config['debug.auto_respond_credential_request'];
      agentConfig.debug.autoRespondPresentationProposal = dto.config['debug.auto_respond_presentation_proposal'];
      agentConfig.debug.autoRespondPresentationRequest = dto.config['debug.auto_respond_presentation_request'];
      agentConfig.debug.autoStoreCredential = dto.config['debug.auto_store_credential'];
      agentConfig.debug.autoAcceptInvites = dto.config['debug.auto_accept_invites'];
      agentConfig.debug.autoAcceptRequests = dto.config['debug.auto_accept_requests'];
      agentConfig.debug.autoRespondMessages = dto.config['debug.auto_respond_messages'];

      agentConfig.defaultEndpoint = dto.config['default_endpoint'];
      agentConfig.additionalEndpoints = dto.config['additional_endpoints'];

      agentConfig.ledger.genesisUrl = dto.config['ledger.genesis_url'];
      agentConfig.ledger.keepalive = dto.config['ledger.keepalive'];

      agentConfig.log.level = dto.config['log.level'];

      agentConfig.trace.target = dto.config['trace.target'];
      agentConfig.trace.tag = dto.config['trace.tag'];
      agentConfig.trace.label = dto.config['trace.label'];

      agentConfig.autoProvision = dto.config['auto_provision'];

      agentConfig.transport.inboundConfigs = dto.config['transport.inbound_configs'];
      agentConfig.transport.outboundConfigs = dto.config['transport.outbound_configs'];
      agentConfig.transport.enableUndeliveredQueue = dto.config['enable_undelivered_queue'];

      agentConfig.defaultLabel = dto.config['default_label'];

      agentConfig.transport.maxMessageSize = dto.config['transport.max_message_size'];
      agentConfig.transport.maxOutboundRetry = dto.config['transport.max_outbound_retry'];
      agentConfig.transport.wsHeartbeatInterval = dto.config['transport.ws.heartbeat_interval'];
      agentConfig.transport.wsTimeoutInterval = dto.config['transport.ws.timeout_interval'];

      agentConfig.wallet.name = dto.config['wallet.name'];
      agentConfig.wallet.storageType = dto.config['wallet.storage_type'];
      agentConfig.wallet.type = dto.config['wallet.type'];
      agentConfig.wallet.storageConfig = dto.config['wallet.storage_config'];

      agentConfig.endorser.author = dto.config['endorser.author'];
      agentConfig.endorser.endorser = dto.config['endorser.endorser'];
      agentConfig.endorser.autoEndorse = dto.config['endorser.auto_endorse'];
      agentConfig.endorser.autoWrite = dto.config['endorser.auto_write'];
      agentConfig.endorser.autoCreateRevReg = dto.config['endorser.auto_create_rev_reg'];
      agentConfig.endorser.autoPromoteAuthorDid = dto.config['endorser.auto_promote_author_did'];

      agentConfig.ledger.readOnly = dto.config['ledger.read_only'];
      agentConfig.ledger.genesisTransactions = dto.config['ledger.genesis_transactions'];

      return agentConfig;
    }));
  }

  get(agentTemplate: AgentTemplate, id: string): Observable<Connection> {
    const header = agentTemplate.apiKey ? new HttpHeaders({'x-api-key': agentTemplate.apiKey}) : new HttpHeaders();
    return this.http.get<any>(`${agentTemplate.url}/connections/${id}`, { headers: header }).pipe(map(dto => {
      return {
        id: dto.connection_id,
        accept: dto.accept,
        alias: dto.alias,
        errorMessage: dto.error_msg,
        inboundConnectionId: dto.inbound_connection_id,
        invitationKey: dto.invitation_key,
        invitationMode: dto.invitation_mode,
        invitationMessageId: dto.invitation_msg_id,
        myDid: dto.my_did,
        requestId: dto.request_id,
        rfc23State: dto.rfc23_state,
        routingState: dto.routing_state,
        state: dto.state,
        theirDid: dto.their_did,
        theirLabel: dto.their_label,
        theirPublicDid: dto.their_public_did,
        theirRole: dto.their_role,
        createdAt: dto.created_at,
        updatedAt:dto.updated_at
      };
    }));
  }

  accept(agentTemplate: AgentTemplate, id: string, myEndpoint: string = ''): Observable<Connection> {
    let query = '';
    if (myEndpoint && myEndpoint !== '') query += '?my_endpoint=' + myEndpoint;
    const header = agentTemplate.apiKey ? new HttpHeaders({'x-api-key': agentTemplate.apiKey}) : new HttpHeaders();
    return this.http.post<any>(`${agentTemplate.url}/connections/${id}/accept-request${query}`, { headers: header }).pipe(map(dto => {
      return {
        id: dto.connection_id,
        accept: dto.accept,
        alias: dto.alias,
        errorMessage: dto.error_msg,
        inboundConnectionId: dto.inbound_connection_id,
        invitationKey: dto.invitation_key,
        invitationMode: dto.invitation_mode,
        invitationMessageId: dto.invitation_msg_id,
        myDid: dto.my_did,
        requestId: dto.request_id,
        rfc23State: dto.rfc23_state,
        routingState: dto.routing_state,
        state: dto.state,
        theirDid: dto.their_did,
        theirLabel: dto.their_label,
        theirPublicDid: dto.their_public_did,
        theirRole: dto.their_role,
        createdAt: dto.created_at,
        updatedAt:dto.updated_at
      };
    }));
  }

  delete(agentTemplate: AgentTemplate, id: string): Observable<void> {
    const header = agentTemplate.apiKey ? new HttpHeaders({'x-api-key': agentTemplate.apiKey}) : new HttpHeaders();
    return this.http.delete<any>(`${agentTemplate.url}/connections/${id}`, { headers: header });
  }

}