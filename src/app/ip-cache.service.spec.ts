import { TestBed } from '@angular/core/testing';

import { IpCacheService } from './ip-cache.service';

describe('IpCacheService', () => {
  let service: IpCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
