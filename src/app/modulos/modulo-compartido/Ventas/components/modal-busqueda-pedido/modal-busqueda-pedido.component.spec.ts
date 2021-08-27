import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaPedidoComponent } from './modal-busqueda-pedido.component';

describe('ModalBusquedaPedidoComponent', () => {
  let component: ModalBusquedaPedidoComponent;
  let fixture: ComponentFixture<ModalBusquedaPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
