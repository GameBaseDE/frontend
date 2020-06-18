import { TestBed } from '@angular/core/testing';

import { GameserverMockService } from './gameserver-mock.service';

describe('GameserverMockService', () => {
  let service: GameserverMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameserverMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
