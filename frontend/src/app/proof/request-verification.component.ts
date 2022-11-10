import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subject, Subscription, takeUntil } from 'rxjs';
import { AgentTemplate } from '../models/agent-template';
import { Connection } from '../models/connection';
import { CreateInvitationResponse } from '../models/create-invitation-response';
import { Invitation } from '../models/invitation';
import { PresentationExchange } from '../models/presentation-exchange';
import { PresentationExchangeState } from '../models/presentation-exchange-state.enum';
import { PresentationRequest } from '../models/presentation-request';
import { ProofRequest } from '../models/proof-request';
import { RequestedAttribute } from '../models/requested-attribute';
import { RequestedPredicate } from '../models/requested-predicate';
import { ConnectionService } from '../services/connection.service';
import { PresentProofService } from '../services/present-proof.service';

@Component({
  selector: 'request-verification',
  templateUrl: './request-verification.component.html',
  styleUrls: ['./request-verification.component.css']
})
export class RequestVerificationComponent implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();
  
    curentProofRequest: ProofRequest | null  = null;

    qrCodeData: string = '';

    invitation: Invitation = new Invitation();
  
    connectionId: string = '';
  
    getConnectionSubscription: Subscription | null = null;

    mySubscription2: Subscription | null = null;

    offerLinkVisible: boolean = false;

    offerLinkUrl: string = '';

    verified: boolean = false;

    agentTemplate: AgentTemplate | null = null;

    @Input('proofRequest') 
    set setProofRequest(value: ProofRequest | null) {
      this.curentProofRequest = value;
    };

    @Input('agentTemplate')
    set setAgentTemplate(value: AgentTemplate | null) {
      this.agentTemplate = value;
    }

    constructor(private connectionService: ConnectionService, 
                private presentProofService: PresentProofService) { 
    }

    ngOnInit(): void {
      this.createInvitation();
    }

    ngOnDestroy(): any {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }


    private createInvitation(): void {
      if (this.agentTemplate == null) return;
      let agentTemplate = this.agentTemplate;
      this.connectionService.createInvitation(agentTemplate).pipe(takeUntil(this.ngUnsubscribe)).subscribe((response: CreateInvitationResponse) => {
        this.qrCodeData = response.invitationUrl;
        this.invitation = response.invitation;
        this.connectionId = response.connectionId; 
        this.offerLinkVisible = true;
        this.offerLinkUrl = response.invitationUrl;
        this.getConnectionSubscription = interval(1000).subscribe((x => {
          this.connectionService.get(agentTemplate, this.connectionId).pipe(takeUntil(this.ngUnsubscribe)).subscribe((connection: Connection) => {
            if (connection.state !== 'invitation') {
              this.getConnectionSubscription?.unsubscribe();
              this.connectionService.accept(agentTemplate, this.connectionId).pipe(takeUntil(this.ngUnsubscribe)).subscribe((connection: Connection) => {
                let presentationRequest: PresentationRequest = new PresentationRequest();
                presentationRequest.connectionId = this.connectionId;
                if (this.curentProofRequest !== null) {
                  presentationRequest.proofRequest = this.optimizeProofRequest(this.curentProofRequest);
                  this.presentProofService.send(agentTemplate, presentationRequest).pipe(takeUntil(this.ngUnsubscribe)).subscribe((presentationExchange: PresentationExchange) => {
                    let bla = 1;
                    this.mySubscription2 = interval(1000).subscribe((x => {
                        this.presentProofService.getPresentationExchange(agentTemplate, presentationExchange.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe((presentationExchange2: PresentationExchange) => {
                        if (presentationExchange2.state !== PresentationExchangeState.RequestSent) {
                            this.mySubscription2?.unsubscribe();
                            this.presentProofService.verify(agentTemplate, presentationExchange.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe((presentationExchange3: PresentationExchange) => {
                              if (presentationExchange3.verified) {
                                this.verified = true;
                                this.offerLinkVisible = false;
                              }
                            });
                         }
                        });
                    }));
                  });
                }
              });
            }
          });
        }));
      });
    }

    private optimizeProofRequest(proofRequest: ProofRequest): ProofRequest {
      let attributeReferent: number = 1;
      let predicateReferent: number = 1;
      let newProofRequest: ProofRequest = new ProofRequest();
      newProofRequest.name = proofRequest.name;
      newProofRequest.version = proofRequest.version;
      for (const requestedAttribute of proofRequest.requestedAttributes) {
        for (const name of this.getNames(requestedAttribute)) {
          let found = false;
          for (const requestedAttribute2 of newProofRequest.requestedAttributes) {
            if (requestedAttribute2.name === name) {
              found = true;
              for (const restriction of requestedAttribute.restrictions) {
                requestedAttribute2.restrictions.push(restriction);
              }
            }
          }
          if (!found) {
            let requestedAttribute3 = new RequestedAttribute();
            requestedAttribute3.id = 'attribute_referent_' + attributeReferent;
            attributeReferent++;
            requestedAttribute3.name = name;
            requestedAttribute3.restrictions = [...requestedAttribute.restrictions];
            newProofRequest.requestedAttributes.push(requestedAttribute3);
          }
        }
      }
      for (const requestedPredicate of proofRequest.requestedPredicates) {
        let found = false;
        for (const requestedPredicate2 of newProofRequest.requestedPredicates) {
          if (requestedPredicate2.name === requestedPredicate.name && 
               requestedPredicate2.condition === requestedPredicate.condition &&
               requestedPredicate2.value === requestedPredicate.value) {
            found = true;
            for (const restriction of requestedPredicate.restrictions) {
              requestedPredicate2.restrictions.push(restriction);
            }
          }
        }
        if (!found) {
          let requestedPredicate3 = new RequestedPredicate();
          requestedPredicate3.id = 'predicate_referent_' + predicateReferent;
          predicateReferent++;
          requestedPredicate3.name = requestedPredicate.name;
          requestedPredicate3.condition = requestedPredicate.condition;
          requestedPredicate3.value = requestedPredicate.value;
          requestedPredicate3.restrictions = requestedPredicate.restrictions;
          newProofRequest.requestedPredicates.push(requestedPredicate3);
        }
      }
      return newProofRequest;
    }

    private getNames(requestedAttribute: RequestedAttribute): string[] {
      let names: string[] = [];
      if (requestedAttribute.name && requestedAttribute.name !== '') names.push(requestedAttribute.name);
      if (requestedAttribute.names) {
        for (const name of requestedAttribute.names) {
          if (name && name !== '') names.push(name);
        }
      }
      return names;
    }
}