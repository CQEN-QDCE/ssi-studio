import * as _ from 'lodash';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { lastValueFrom, Subject, takeUntil } from 'rxjs';
import { AgentTemplate } from '../models/agent-template';
import { TranslateService } from '@ngx-translate/core';
import { IssueCredential } from '../models/issue-credential';
import { IssueCredentialService } from '../services/issue-credential.service';
import { RevocationService } from '../services/revocation.service';
import { RevokeRequest } from '../models/revoke-request';
import { IssuerService } from '../services/issuer.service';

@Component({
  selector: 'issue-credential',
  templateUrl: './issue-credential.component.html',
  styleUrls: ['./issue-credential.component.css']
})
export class IssueCredentialComponent implements OnInit, OnDestroy {

  issueCredentials: IssueCredential[] = [];

  issueCredential: IssueCredential = new IssueCredential();

  agentTemplate: AgentTemplate | null = null;

  @Input('agentTemplate') 
  set setAgentTemplate(value: AgentTemplate | null) {
    this.agentTemplate = value;
    this.load();
  };
  
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private readonly issueCredentialService: IssueCredentialService,
              private readonly issuerService: IssuerService,
              private readonly revocationService: RevocationService,
              private readonly translate: TranslateService) { 
  }

  async ngOnInit(): Promise<void> {
    await lastValueFrom(this.translate.get('Translation'));
  }

  ngOnDestroy(): any {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  revoke(index: number): void {
    if (this.agentTemplate === null) return;
    const issueCredential = this.issueCredentials[index];
    this.issuerService.getCredentialExchange(this.agentTemplate, issueCredential.credentialExchangeId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(credentialExchange => {
        const revokeRequest = new RevokeRequest();
        revokeRequest.connectionId = credentialExchange.connectionId;
        revokeRequest.credentialExchangeId = credentialExchange.credentialExchangeId;
        revokeRequest.notify = true;
        revokeRequest.publish = true;
        revokeRequest.threadId = credentialExchange.threadId;
        if (this.agentTemplate === null) return;
        this.revocationService.revoke(this.agentTemplate, revokeRequest).pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
            issueCredential.revoked = true;
            this.issueCredentialService.save(issueCredential).pipe(takeUntil(this.ngUnsubscribe)).subscribe((issueCredential) => {
                this.issueCredentials[index] = issueCredential;
            });
        });
    });
  }

  private load(): void {
    if (this.agentTemplate === null) return;
    this.issueCredentialService.getAllByAgent(this.agentTemplate.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(issueCredentials => {
        this.issueCredentials = issueCredentials;
    });
  }
 
}