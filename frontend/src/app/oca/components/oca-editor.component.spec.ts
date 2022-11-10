import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OcaEditorComponent } from './oca-editor.component';

describe('SchemaEditorComponent', () => {
  let component: OcaEditorComponent;
  let fixture: ComponentFixture<OcaEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcaEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcaEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
