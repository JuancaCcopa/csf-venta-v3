import { TestBed } from '@angular/core/testing';

import { VentaCompartidoService } from './venta-compartido.service';

describe('VentaCompartidoService', () => {
  let service: VentaCompartidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VentaCompartidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
