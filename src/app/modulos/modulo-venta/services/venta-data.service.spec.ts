import { TestBed } from '@angular/core/testing';

import { VentaDataService } from './venta-data.service';

describe('VentaDataService', () => {
  let service: VentaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VentaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
