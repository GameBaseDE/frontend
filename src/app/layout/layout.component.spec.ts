import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LayoutComponent} from './layout.component';
import {HeaderComponent} from './header/header.component';
import {
  NbActionsModule,
  NbContextMenuModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule, NbThemeModule,
  NbUserModule
} from '@nebular/theme';
import {RouterTestingModule} from '@angular/router/testing';
import {FooterComponent} from './footer/footer.component';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NbAuthModule, NbAuthService, NbDummyAuthStrategy} from '@nebular/auth';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutComponent, HeaderComponent, FooterComponent],
      imports: [NbMenuModule.forRoot(), NbSidebarModule.forRoot(), RouterTestingModule, NbLayoutModule, NbIconModule, NbSearchModule,
        NbActionsModule, NbUserModule, NbContextMenuModule, NbThemeModule.forRoot({name: 'dark'}), NbEvaIconsModule,
        BrowserAnimationsModule, NbAuthModule.forRoot({
          strategies:
            [NbDummyAuthStrategy.setup(
              {name: 'email', alwaysFail: false})]
        })],
      providers: [NbAuthService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
