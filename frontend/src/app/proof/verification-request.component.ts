import * as _ from 'lodash';
import { ChangeDetectorRef, Component, forwardRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { CredentialRequest } from '../models/credential-request';
import { RequestedAttribute } from '../models/requested-attribute';
import { RequestedPredicate } from '../models/requested-predicate';
import { Restriction } from '../models/restriction';
import { RestrictionType } from '../models/restriction-type.enum';
import { VerificationTemplate } from '../models/verification-template';

export const verificationRequestValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => VerificationRequestComponent),
  multi: true
};
@Component({
  selector: 'verification-request',
  templateUrl: './verification-request.component.html',
  styleUrls: ['./verification-request.component.css'],
  providers: [verificationRequestValueAccessor]
})
export class VerificationRequestComponent implements OnInit, OnDestroy {

  verificationTemplate: VerificationTemplate  = new VerificationTemplate();

  onModelChange: Function = () => { };

  conditions: string[] = [];

  restrictions: any[] = [];

  @ViewChild('verificationForm') verificationForm: NgForm | null = null;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private readonly cd: ChangeDetectorRef) { 
    this.restrictions = [
      { name: RestrictionType.SchemaId, value: { type: RestrictionType.SchemaId, value: null } },
      { name: RestrictionType.IssuerDid, value: { type: RestrictionType.IssuerDid, value: null } },
      { name: RestrictionType.CredentialDefinitionId, value: { type: RestrictionType.CredentialDefinitionId, value: null } },
      { name: RestrictionType.SchemaIssuerDid, value: { type: RestrictionType.SchemaIssuerDid, value: null } },
      { name: RestrictionType.SchemaName, value: { type: RestrictionType.SchemaName, value: null } },
      { name: RestrictionType.SchemaVersion, value: { type: RestrictionType.SchemaVersion, value: null } }
    ];
  }

  ngOnInit(): void {
    this.conditions.push('>');
    this.conditions.push('>=');
    this.conditions.push('<');
    this.conditions.push('<=');
  }

  ngOnDestroy(): any {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onTouched = () => {
  };

  writeValue(verificationTemplate: VerificationTemplate): void {
    this.verificationTemplate = verificationTemplate || new VerificationTemplate();
    this.cd.markForCheck();
  }

  registerOnChange(fn: (checked: boolean) => void): void {
      this.onModelChange = fn;    
  }

  registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
  }

  addRequestedAttribute(index: number, index2: number): void {
    let credentialRequest = this.verificationTemplate.credentialRequests[index];
    if (credentialRequest) {
      if (index2 === credentialRequest.requestedAttributes.length - 1) credentialRequest.requestedAttributes.push(new RequestedAttribute());
    }
  }

  addRequestedPredicate(index: number): void {
    let credentialRequest = this.verificationTemplate.credentialRequests[index];
    if (credentialRequest) {
      credentialRequest.requestedPredicates.push(new RequestedPredicate());
    }
  }

  restrictionChange(newobj: Restriction, index: number): void {
    this.verificationTemplate.credentialRequests[index].restrictions = _.cloneDeep(this.verificationTemplate.credentialRequests[index].restrictions);
  }

  addCredentialRequest(): void {
    let credentialRequest = new CredentialRequest();
    credentialRequest.requestedAttributes.push(new RequestedAttribute());
    this.verificationTemplate.credentialRequests.push(credentialRequest);
  }

  removeCredentialRequest(index: number): void {
    this.verificationTemplate.credentialRequests.splice(index, 1);
  }

  removeAttribute(credentialRequestIndex: number, requestedAttributeIndex: number): void {
    this.verificationTemplate.credentialRequests[credentialRequestIndex].requestedAttributes.splice(requestedAttributeIndex, 1);
  }

  removePredicate(credentialRequestIndex: number, requestedAttributeIndex: number): void {
    this.verificationTemplate.credentialRequests[credentialRequestIndex].requestedPredicates.splice(requestedAttributeIndex, 1);
  }

  validate(): boolean {
    if (!this.verificationForm) return false;
    if (this.verificationForm.invalid) {
      for (const control of Object.keys(this.verificationForm.controls)) {
        this.verificationForm.controls[control].markAsTouched();
        this.verificationForm.controls[control].markAsDirty();
      }
      return false;
    }
    return true;
  }
}