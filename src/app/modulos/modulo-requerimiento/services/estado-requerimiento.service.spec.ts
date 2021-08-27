import { TestBed } from '@angular/core/testing';

import { EstadoRequerimientoService } from './estado-requerimiento.service';

describe('EstadoRequerimientoService', () => {
  let service: EstadoRequerimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoRequerimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
