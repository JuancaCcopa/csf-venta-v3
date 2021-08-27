import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaSocioNegocioComponent } from './modal-busqueda-socio-negocio.component';

describe('ModalBusquedaSocioNegocioComponent', () => {
  let component: ModalBusquedaSocioNegocioComponent;
  let fixture: ComponentFixture<ModalBusquedaSocioNegocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaSocioNegocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaSocioNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
