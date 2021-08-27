import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaAtencionPacienteComponent } from './modal-busqueda-atencion-paciente.component';

describe('ModalBusquedaAtencionPacienteComponent', () => {
  let component: ModalBusquedaAtencionPacienteComponent;
  let fixture: ComponentFixture<ModalBusquedaAtencionPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaAtencionPacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaAtencionPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
