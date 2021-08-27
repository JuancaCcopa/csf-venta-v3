import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaSocioNegocioLtComponent } from './modal-busqueda-socio-negocio-lt.component';

describe('ModalBusquedaSocioNegocioLtComponent', () => {
  let component: ModalBusquedaSocioNegocioLtComponent;
  let fixture: ComponentFixture<ModalBusquedaSocioNegocioLtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaSocioNegocioLtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaSocioNegocioLtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
