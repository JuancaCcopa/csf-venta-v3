import { TestBed } from '@angular/core/testing';

import { AprobacionSolicitudService } from './aprobacion-solicitud.service';

describe('AprobacionSolicitudService', () => {
  let service: AprobacionSolicitudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AprobacionSolicitudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
