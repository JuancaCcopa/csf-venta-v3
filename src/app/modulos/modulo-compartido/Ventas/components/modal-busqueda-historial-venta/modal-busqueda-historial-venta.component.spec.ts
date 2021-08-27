import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaHistorialVentaComponent } from './modal-busqueda-historial-venta.component';

describe('ModalBusquedaHistorialVentaComponent', () => {
  let component: ModalBusquedaHistorialVentaComponent;
  let fixture: ComponentFixture<ModalBusquedaHistorialVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaHistorialVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaHistorialVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
