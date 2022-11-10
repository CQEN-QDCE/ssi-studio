import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonCredSchemaEditorComponent } from './anoncred-schema-editor.component';

describe('AnonymousCredentialBuilderComponent', () => {
  let component: AnonCredSchemaEditorComponent;
  let fixture: ComponentFixture<AnonCredSchemaEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnonCredSchemaEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnonCredSchemaEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
