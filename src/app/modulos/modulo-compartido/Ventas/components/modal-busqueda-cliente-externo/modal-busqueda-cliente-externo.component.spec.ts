import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaClienteExternoComponent } from './modal-busqueda-cliente-externo.component';

describe('ModalBusquedaClienteExternoComponent', () => {
  let component: ModalBusquedaClienteExternoComponent;
  let fixture: ComponentFixture<ModalBusquedaClienteExternoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaClienteExternoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaClienteExternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
