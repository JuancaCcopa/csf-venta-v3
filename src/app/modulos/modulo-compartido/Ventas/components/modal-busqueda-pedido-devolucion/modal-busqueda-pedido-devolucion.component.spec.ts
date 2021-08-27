import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaPedidoDevolucionComponent } from './modal-busqueda-pedido-devolucion.component';

describe('ModalBusquedaPedidoDevolucionComponent', () => {
  let component: ModalBusquedaPedidoDevolucionComponent;
  let fixture: ComponentFixture<ModalBusquedaPedidoDevolucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaPedidoDevolucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaPedidoDevolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
