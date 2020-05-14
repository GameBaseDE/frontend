import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateServerWizardComponent} from './createserver.component';
import {NbCardModule, NbRadioModule} from '@nebular/theme';
import {FormsModule} from '@angular/forms';

describe('CreateServerWizardComponent', () => {
  let component: CreateServerWizardComponent;
  let fixture: ComponentFixture<CreateServerWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateServerWizardComponent],
      imports: [NbCardModule, FormsModule]
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
