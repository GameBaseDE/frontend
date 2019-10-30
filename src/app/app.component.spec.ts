import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {NavbarTopComponent} from './navbar-top/navbar-top.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {MatExpansionModule, MatGridListModule, MatMenuModule, MatToolbar, MatToolbarRow} from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, NavbarTopComponent, DashboardComponent, PageNotFoundComponent, MatToolbarRow, MatToolbar
      ],
      imports: [BrowserAnimationsModule, MatMenuModule, RouterTestingModule, MatExpansionModule, MatGridListModule]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'GameBase'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('GameBase');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-navbar-top .title').textContent).toContain('GameBase');
  });
});
