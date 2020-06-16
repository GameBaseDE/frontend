import {NgModule, Optional, SkipSelf} from '@angular/core';
import {GameserverMockService} from './services/gameserver-mock.service';
import {ApiModule} from '../../rest-client/api.module';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    GameserverMockService
  ]
})
export class MockApiModule {
  constructor(
    @Optional() @SkipSelf() parentModule: ApiModule,
  ) {
    if (parentModule) {
      throw new Error('ApiModule is loaded. Either choose MockApiModule or ApiModule.');
    }
  }
}
