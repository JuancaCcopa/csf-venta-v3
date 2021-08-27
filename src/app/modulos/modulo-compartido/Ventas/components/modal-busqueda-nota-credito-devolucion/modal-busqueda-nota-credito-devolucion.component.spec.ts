import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaNotaCreditoDevolucionComponent } from './modal-busqueda-nota-credito-devolucion.component';

describe('ModalBusquedaNotaCreditoDevolucionComponent', () => {
  let component: ModalBusquedaNotaCreditoDevolucionComponent;
  let fixture: ComponentFixture<ModalBusquedaNotaCreditoDevolucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaNotaCreditoDevolucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaNotaCreditoDevolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
