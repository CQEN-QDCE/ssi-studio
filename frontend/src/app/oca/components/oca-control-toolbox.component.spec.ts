import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OcaControlToolboxComponent } from './oca-control-toolbox.component';

describe('SchemaEditorComponent', () => {
  let component: OcaControlToolboxComponent;
  let fixture: ComponentFixture<OcaControlToolboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcaControlToolboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcaControlToolboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
