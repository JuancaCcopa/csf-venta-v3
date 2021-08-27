import { TestBed } from '@angular/core/testing';

import { RequerimientoCompartidoService } from './requerimiento-compartido.service';

describe('RequerimientoCompartidoService', () => {
  let service: RequerimientoCompartidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequerimientoCompartidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
