import { TestBed } from '@angular/core/testing';

import { EstadoVentaService } from './estado-venta.service';

describe('EstadoVentaService', () => {
  let service: EstadoVentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoVentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
