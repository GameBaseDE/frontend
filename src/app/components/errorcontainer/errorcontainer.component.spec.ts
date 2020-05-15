import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorContainerComponent } from './errorcontainer.component';

describe('ErrorContainerComponent', () => {
  let component: ErrorContainerComponent;
  let fixture: ComponentFixture<ErrorContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error message', () => {
    let expected: string = 'This is a test message';
    component.errorMessage = expected;

    let actual: string = component.errorMessage;
    expect(actual).toEqual(expected);
  })
});
