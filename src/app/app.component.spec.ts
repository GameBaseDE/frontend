import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {LayoutComponent} from './layout/layout.component';
import {HeaderComponent} from './layout/header/header.component';
import {
  NbActionsModule,
  NbContextMenuModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbThemeModule,
  NbUserModule
} from '@nebular/theme';
import {FooterComponent} from './layout/footer/footer.component';
import {NbAuthModule, NbAuthService, NbDummyAuthStrategy} from '@nebular/auth';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NbLayoutModule, NbMenuModule.forRoot(), NbSidebarModule.forRoot(), NbIconModule, NbSearchModule,
        NbActionsModule, NbUserModule, NbContextMenuModule, NbThemeModule.forRoot({name: 'dark'}),
        NbAuthModule.forRoot({
          strategies:
            [NbDummyAuthStrategy.setup(
              {name: 'email', alwaysFail: false})]
        })],
      declarations: [AppComponent, LayoutComponent, HeaderComponent, FooterComponent],
      providers: [NbAuthService]
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
});
