import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {
  NbActionsModule,
  NbContextMenuModule,
  NbIconModule, NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbThemeModule,
  NbUserModule
} from '@nebular/theme';
import {RouterTestingModule} from '@angular/router/testing';
import {NbEvaIconsModule} from '@nebular/eva-icons';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [NbIconModule, NbSearchModule, NbActionsModule, NbUserModule, NbContextMenuModule, NbSidebarModule.forRoot(),
        NbThemeModule.forRoot(), RouterTestingModule, NbMenuModule.forRoot(), NbEvaIconsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
