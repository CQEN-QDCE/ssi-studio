import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OcaLanguageSelectorComponent } from './oca-language-selector.component';

describe('OcaLanguageSelectorComponent', () => {
  let component: OcaLanguageSelectorComponent;
  let fixture: ComponentFixture<OcaLanguageSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcaLanguageSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcaLanguageSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
