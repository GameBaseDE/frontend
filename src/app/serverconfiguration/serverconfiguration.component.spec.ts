import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ServerConfigurationComponent} from './serverconfiguration.component';
import {NbCardModule, NbInputModule, NbRadioModule, NbThemeModule} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {ToastrModule} from "ngx-toastr";
import {ApiModule} from "../rest-client/api.module";
import {environment} from "../../environments/environment";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "../app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

// @ts-ignore
describe('ServerConfigurationComponent', () => {
  let component: ServerConfigurationComponent;
  let fixture: ComponentFixture<ServerConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServerConfigurationComponent],
      imports: [
        NbCardModule,
        FormsModule,
        ToastrModule.forRoot(),
        HttpClientModule,
        ApiModule.forRoot({rootUrl: environment.mockAPIURL}),
        AppRoutingModule,
        BrowserAnimationsModule,
        NbThemeModule.forRoot(),
        FormsModule,
        NbInputModule,
        NbRadioModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate Docker image input and display error', () => {
    const expected = '';
    const selector = 'input[name="input-template-path"]';
    let input = fixture.debugElement.query(By.css(selector));
    let element = input.nativeElement;

    expect(element).toBeTruthy(`${selector} could not be found!`);

    element.value = expected;
    element.dispatchEvent(new Event('input'));
    element.dispatchEvent(new Event('keyup'));

    const actual = component.resources.templatePath.value;

    expect(actual).toEqual(expected);
    expect(component.resources.templatePath.hasError).toBeTrue();
  });

  it('should validate Docker image input and display no error', () => {
    const expected = 'hello-world';
    const selector = 'input[name="input-template-path"]';
    let input = fixture.debugElement.query(By.css(selector));
    let element = input.nativeElement;

    expect(element).toBeTruthy(`${selector} could not be found!`);

    element.value = expected;
    element.dispatchEvent(new Event('input'));
    element.dispatchEvent(new Event('keyup'));

    const actual = component.resources.templatePath.value;

    expect(actual).toEqual(expected, `actual: ${actual} != expected: ${expected}`);
    expect(component.resources.templatePath.hasError).toBeFalsy(`Error is displayed although expected: ${expected} complies to rules.`);
  });

  it('should validate memory allocation and display error', () => {
    const expected = 'abcdef';
    const selector = 'input[name="input-memory-allocation"]'
    let input = fixture.debugElement.query(By.css(selector));
    let element = input.nativeElement;

    expect(element).toBeTruthy(`${selector} could not be found!`);

    element.value = expected;
    element.dispatchEvent(new Event('input'));
    element.dispatchEvent(new Event('keyup'));

    const actual = component.resources.memoryAlloc.value;

    expect(actual).toEqual(expected, `actual: ${actual} != expected: ${expected}`);
    expect(component.resources.memoryAlloc.hasError).toBeTruthy(`Error is not displayed although expected: ${expected} is faulty.`);
  });

  it('should validate memory allocation and display no error', () => {
    const expected = '1234';
    const selector = 'input[name="input-memory-allocation"]'
    let input = fixture.debugElement.query(By.css(selector));
    let element = input.nativeElement;

    expect(element).toBeTruthy(`${selector} could not be found!`);

    element.value = expected;
    element.dispatchEvent(new Event('input'));
    element.dispatchEvent(new Event('keyup'));

    const actual = component.resources.memoryAlloc.value;

    expect(actual).toEqual(expected, `actual: ${actual} != expected: ${expected}`);
    expect(component.resources.memoryAlloc.hasError).toBeFalsy(`Error is displayed although expected: ${expected} complies to rules.`);
  });

  it('should validate UDP port allocation with invalid comma-separated values and display error', () => {
    const expected = '1354987,,,';
    const selector = 'input[name="input-udp-port-allocation"]';
    let input = fixture.debugElement.query(By.css(selector));
    let element = input.nativeElement;

    expect(element).toBeTruthy(`${selector} could not be found!`);

    element.value = expected;
    element.dispatchEvent(new Event('input'));
    element.dispatchEvent(new Event('keyup'));

    const actual = component.resources.portAlloc.udp.rawValue;

    expect(actual).toEqual(expected, `actual: ${actual} != expected: ${expected}`);
    expect(component.resources.portAlloc.udp.hasError).toBeTruthy(`Error is not displayed although expected: ${expected} is faulty.`);
  });

  it('should validate UDP port allocation with invalid port values, display error and parse into faulty values properly', () => {
    const expected = '0,5,54,5123,90000';
    const expectedFaulty = ['0', '90000'];
    const selector = 'input[name="input-udp-port-allocation"]';
    let input = fixture.debugElement.query(By.css(selector));
    let element = input.nativeElement;

    expect(element).toBeTruthy(`${selector} could not be found!`);

    element.value = expected;
    element.dispatchEvent(new Event('input'));
    element.dispatchEvent(new Event('keyup'));

    const actual = component.resources.portAlloc.udp.rawValue;

    expect(actual).toEqual(expected, `actual: ${actual} != expected: ${expected}`);
    expect(component.resources.portAlloc.udp.hasError).toBeTruthy(`Error is not displayed although expected: ${expected} is faulty.`);

    const actualFaulty = component.resources.portAlloc.udp.faultyValues;

    expect(actualFaulty).toEqual(expectedFaulty, `actualFaulty: ${actualFaulty} != expectedFaulty: ${expectedFaulty}`);
  });

  it('should validate UDP port allocation, display no error and parse values properly', () => {
    const expected = '1024,65565';
    const expectedParsed = ['1024', '65565'];
    const selector = 'input[name="input-udp-port-allocation"]';
    let input = fixture.debugElement.query(By.css(selector));
    let element = input.nativeElement;

    expect(element).toBeTruthy(`${selector} could not be found!`);

    element.value = expected;
    element.dispatchEvent(new Event('input'));
    element.dispatchEvent(new Event('keyup'));

    const actual = component.resources.portAlloc.udp.rawValue;

    expect(actual).toEqual(expected);
    expect(component.resources.portAlloc.udp.hasError).toBeFalsy(`Error is displayed although expected: ${expected} complies to rules.`);

    const actualParsed = component.resources.portAlloc.udp.parsedValues;

    expect(actualParsed).toEqual(expectedParsed, `actualParsed: ${actualParsed} != expectedParsed: ${expectedParsed}`);
  });
});
