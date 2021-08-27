import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaPedidosPorPacienteComponent } from './modal-busqueda-pedidos-por-paciente.component';

describe('ModalBusquedaPedidosPorPacienteComponent', () => {
  let component: ModalBusquedaPedidosPorPacienteComponent;
  let fixture: ComponentFixture<ModalBusquedaPedidosPorPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaPedidosPorPacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaPedidosPorPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
