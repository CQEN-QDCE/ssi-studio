import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, Observable, Subject } from 'rxjs';
import { Connection } from '../models/connection';
import { ConnectionQuery } from '../models/connection-query';
import { CreateInvitationRequest } from '../models/create-invitation-request';
import { CreateInvitationResponse } from '../models/create-invitation-response';
import { Poller } from './poller.service';
import { AgentTemplate } from '../models/agent-template';

@Injectable()
export class ConnectionService {

  private hostUrl: string = environment.config.issuerHostUrl;

  constructor(private http: HttpClient, private poller: Poller) {
  }

  waitRequest(agent: AgentTemplate, connectionId: string): Observable<Connection> {
    let subject = new Subject<Connection>();
    this.poller.startPoll<Connection>(() => this.get(agent, connectionId), 
                                      (connection => connection.state !== 'invitation')).subscribe({next: (connection: Connection) => {
      subject.next(connection);
    },
    error: (error) => {
      subject.error(error);
    }});
    return subject.asObservable();
  }

  search(query: ConnectionQuery = new ConnectionQuery()): Observable<Connection[]> {
    let params: any[] = [];
    if (query) {
      if (query.alias !== null) params.push('alias=' + query.alias);
      if (query.invitationKey !== null) params.push('invitation_key=' + query.invitationKey);
      if (query.myDid !== null) params.push('my_did=' + query.myDid);
      if (query.state !== null) params.push('state=' + query.state);
      if (query.theirDid !== null) params.push('their_did=' + query.theirDid);
      if (query.theirRole !== null) params.push('their_role=' + query.theirRole);
    }
    let queryParams = params.length > 0 ? '?' + params.join('&') : '';
    return this.http.get<any>(`${this.hostUrl}/connections${queryParams}`).pipe(map(dtos => {
      const connections: Connection[] = [];
      for (const dto of dtos.results) {
        connections.push({
          accept: dto.accept,
          id: dto.connection_id,
          createdAt: dto.created_at,
          invitationKey: dto.invitation_key,
          invitationMode: dto.invitation_mode,
          myDid: dto.my_did,
          rfc23State: dto.rfc23_state,
          routingState: dto.routing_state,
          state: dto.state,
          theirDid: dto.their_did,
          theirLabel: dto.their_label,
          theirRole: dto.their_role,
          updatedAt:dto.updated_at,
          alias: dto.alias,
          errorMessage: dto.error_msg,
          inboundConnectionId: dto.inbound_connection_id,
          invitationMessageId: dto.invitation_msg_id,
          requestId: dto.request_id,
          theirPublicDid: dto.their_public_did,
        });
      }
      return connections;
    }));
  }

  createInvitation(agent: AgentTemplate, request: CreateInvitationRequest = new CreateInvitationRequest(), autoAccept: boolean = false, multiUse: boolean = false, fromPublicDid: boolean = false, alias: string = ''): Observable<CreateInvitationResponse> {
    let subject = new Subject<CreateInvitationResponse>();
    request.serviceEndpoint
    this.http.post<any>(`${agent.url}/connections/create-invitation?auto_accept=${autoAccept}&multi_use=${multiUse}&public=${fromPublicDid}&alias=${alias}`, {}).subscribe(
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

  get(agent: AgentTemplate, id: string): Observable<Connection> {
    return this.http.get<any>(`${agent.url}/connections/${id}`).pipe(map(dto => {
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

  accept(agent: AgentTemplate, id: string, myEndpoint: string = ''): Observable<Connection> {
    let query = '';
    if (myEndpoint && myEndpoint !== '') query += '?my_endpoint=' + myEndpoint;
    return this.http.post<any>(`${agent.url}/connections/${id}/accept-request${query}`, {}).pipe(map(dto => {
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

  delete(id: string): Observable<void> {
    return this.http.delete<any>(`${this.hostUrl}/connections/${id}`);
  }

}