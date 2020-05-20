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

  it('should validate Docker image input and display error', () => {
    let expected = '';
    let input = fixture.debugElement.query(By.css('input[name="input-docker-image"]'));
    let element = input.nativeElement;

    expect(element).toBeTruthy();

    element.value = expected;
    element.dispatchEvent(new Event('input'));

    let actual = component.dockerImage.value;
    expect(actual).toEqual(expected);
    expect(component.dockerImage.hasError).toBeTrue();
  });

  it('should validate Docker image input and display no error', () => {
    let expected = 'hello-world';
    let input = fixture.debugElement.query(By.css('input[name="input-docker-image"]'));
    let element = input.nativeElement;

    expect(element).toBeTruthy();

    element.value = expected;
    element.dispatchEvent(new Event('input'));

    let actual = component.dockerImage.value;
    expect(actual).toEqual(expected);
    expect(component.dockerImage.hasError).toBeFalse();
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

  it('should validate port allocation and display error', () => {
    let expected = '1354987,,,';
    let input = fixture.debugElement.query(By.css('input[name="input-port-allocation"]'));
    let element = input.nativeElement;

    expect(element).toBeTruthy();

    element.value = expected;
    element.dispatchEvent(new Event('input'));

    let actual = component.portAlloc.rawValue;
    expect(actual).toEqual(expected);
    expect(component.portAlloc.hasError).toBeTrue();
  });

  it('should validate port allocation with invalid port values, display error and parse into faulty values properly', () => {
    let expected = '1,5,54,5123';
    let expectedFaulty = ['1', '5', '54'];
    let input = fixture.debugElement.query(By.css('input[name="input-port-allocation"]'));
    let element = input.nativeElement;

    expect(element).toBeTruthy();

    element.value = expected;
    element.dispatchEvent(new Event('input'));

    let actual = component.portAlloc.rawValue;
    expect(actual).toEqual(expected);
    expect(component.portAlloc.hasError).toBeTrue();
    expect(component.portAlloc.faultyValues).toEqual(expectedFaulty);
  });

  it('should validate port allocation, display no error and parse values properly', () => {
    let expected = '1024,65565';
    let expectedParsed = ['1024', '65565'];
    let input = fixture.debugElement.query(By.css('input[name="input-port-allocation"]'));
    let element = input.nativeElement;

    expect(element).toBeTruthy();

    element.value = expected;
    element.dispatchEvent(new Event('input'));

    let actual = component.portAlloc.rawValue;
    expect(actual).toEqual(expected);
    expect(component.portAlloc.hasError).toBeFalse();
    expect(component.portAlloc.parsedValues).toEqual(expectedParsed);
  });
});
