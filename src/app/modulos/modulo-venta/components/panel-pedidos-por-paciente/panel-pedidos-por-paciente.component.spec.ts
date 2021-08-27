import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPedidosPorPacienteComponent } from './panel-pedidos-por-paciente.component';

describe('PanelPedidosPorPacienteComponent', () => {
  let component: PanelPedidosPorPacienteComponent;
  let fixture: ComponentFixture<PanelPedidosPorPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelPedidosPorPacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelPedidosPorPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
