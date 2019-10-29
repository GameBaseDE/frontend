import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavbarTopComponent} from './navbar-top.component';
import {MatMenuModule, MatToolbar, MatToolbarRow} from '@angular/material';

describe('NavbarTopComponent', () => {
  let component: NavbarTopComponent;
  let fixture: ComponentFixture<NavbarTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarTopComponent, MatToolbar, MatToolbarRow],
      imports: [MatMenuModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
