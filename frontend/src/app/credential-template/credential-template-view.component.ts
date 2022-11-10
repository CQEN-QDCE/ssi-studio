import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CredentialTemplate } from '../models/credential-template';

@Component({
  selector: 'credential-template-view',
  templateUrl: './credential-template-view.component.html',
  styleUrls: ['./credential-template-view.component.css']
})
export class CredentialTemplateViewComponent implements OnInit, OnDestroy {

  credentialTemplate: CredentialTemplate = new CredentialTemplate();

  @Input('credentialTemplate') 
  set setCredentialTemplate(value: CredentialTemplate) {
    this.credentialTemplate = value;
  };

  private ngUnsubscribe: Subject<void> = new Subject<void>();
    
  constructor() { 
  }

  ngOnInit(): void {
    let bla = 1;
  }

  ngOnDestroy(): any {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
