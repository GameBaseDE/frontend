import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateServerWizardComponent} from './createserver.component';
import {NbCardModule, NbRadioModule} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';

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

  it('should validate memory allocation and display error', () => {
    let expected = 'abcdef';
    let input = fixture.debugElement.query(By.css('input[name="input-memory-allocation"]'));
    let element = input.nativeElement;

    expect(element).toBeTruthy();

    element.value = expected;
    element.dispatchEvent(new Event('input'));

    let actual = component.memoryAlloc.value;
    expect(actual).toEqual(expected);
    expect(component.memoryAlloc.hasError).toBeTrue();
  });

  it('should validate memory allocation and display no error', () => {
    let expected = '1234';
    let input = fixture.debugElement.query(By.css('input[name="input-memory-allocation"]'));
    let element = input.nativeElement;

    expect(element).toBeTruthy();

    element.value = expected;
    element.dispatchEvent(new Event('input'));

    let actual = component.memoryAlloc.value;
    expect(actual).toEqual(expected);
    expect(component.memoryAlloc.hasError).toBeFalse();
  });
});
