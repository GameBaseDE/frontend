import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameServerAccordionItemComponent } from './game-server-accordion-item.component';

describe('GameServerAccordionItemComponent', () => {
  let component: GameServerAccordionItemComponent;
  let fixture: ComponentFixture<GameServerAccordionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameServerAccordionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameServerAccordionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
