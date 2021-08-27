import { TestBed } from '@angular/core/testing';

import { MensajePrimeNgService } from './mensaje-prime-ng.service';

describe('MensajePrimeNgService', () => {
  let service: MensajePrimeNgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensajePrimeNgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
