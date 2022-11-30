import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CredentialTemplate } from '../models/credential-template';
import { CredentialTemplateService } from '../services/credential-template.service';

@Component({
  selector: 'credential-template-details',
  templateUrl: './credential-template-details.component.html',
  styleUrls: ['./credential-template-details.component.css']
})
export class CredentialTemplateDetailsComponent implements OnInit, OnDestroy {

  credentialTemplate: CredentialTemplate = new CredentialTemplate();

  private ngUnsubscribe: Subject<void> = new Subject<void>();
    
  constructor(private readonly route: ActivatedRoute, 
              private readonly credentialTemplateService: CredentialTemplateService,) { 
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
      let credentialId = params.get('credentialId');
      if (credentialId) {
        this.credentialTemplateService.get(credentialId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(credentialTemplate => {
          this.credentialTemplate = credentialTemplate;
        });
      }
    });
  }

  ngOnDestroy(): any {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
