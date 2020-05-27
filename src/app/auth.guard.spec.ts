import {TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {NbAuthModule, NbAuthService, NbDummyAuthStrategy} from '@nebular/auth';
import {RouterTestingModule} from '@angular/router/testing';

describe('AuthGuardGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NbAuthModule.forRoot({
        strategies: [NbDummyAuthStrategy.setup({
          alwaysFail: false,
          name: 'email'
        })]
      }), RouterTestingModule],
      providers: [NbAuthService]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
