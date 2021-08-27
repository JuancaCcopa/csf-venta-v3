import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaVentaPorAtencionComponent } from './modal-busqueda-venta-por-atencion.component';

describe('ModalBusquedaVentaPorAtencionComponent', () => {
  let component: ModalBusquedaVentaPorAtencionComponent;
  let fixture: ComponentFixture<ModalBusquedaVentaPorAtencionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaVentaPorAtencionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaVentaPorAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
