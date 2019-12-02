import {TestBed} from '@angular/core/testing';

import {RestclientService} from './restclient.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('RestclientService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: RestclientService = TestBed.get(RestclientService);
    expect(service).toBeTruthy();
  });
});
