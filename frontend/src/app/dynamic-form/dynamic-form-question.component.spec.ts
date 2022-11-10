import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialOfferComponent } from '../credential-issuer/credential-issuer.component';

describe('GenericIssuerComponent', () => {
  let component: CredentialOfferComponent;
  let fixture: ComponentFixture<CredentialOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CredentialOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
