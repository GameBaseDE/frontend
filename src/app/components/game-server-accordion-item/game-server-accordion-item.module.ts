import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GameServerAccordionItemComponent} from './game-server-accordion-item.component';
import {NbAccordionComponent, NbAccordionModule, NbAlertModule, NbIconModule} from '@nebular/theme';



@NgModule({
  declarations: [
    GameServerAccordionItemComponent,
  ],
  exports: [
    GameServerAccordionItemComponent
  ],
  imports: [
    CommonModule,
    NbAlertModule,
    NbIconModule,
    NbAccordionModule
  ]
})
export class GameServerAccordionItemModule { }
