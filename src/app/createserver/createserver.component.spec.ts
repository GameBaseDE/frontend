import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServerWizardComponent } from './createserver.component';

describe('CreateServerWizardComponent', () => {
  let component: CreateServerWizardComponent;
  let fixture: ComponentFixture<CreateServerWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateServerWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateServerWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
