import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaClienteComponent } from './modal-busqueda-cliente.component';

describe('ModalBusquedaClienteComponent', () => {
  let component: ModalBusquedaClienteComponent;
  let fixture: ComponentFixture<ModalBusquedaClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
