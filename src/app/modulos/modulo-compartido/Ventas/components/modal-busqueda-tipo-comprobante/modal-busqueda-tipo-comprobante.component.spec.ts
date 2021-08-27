import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaTipoComprobanteComponent } from './modal-busqueda-tipo-comprobante.component';

describe('ModalBusquedaTipoComprobanteComponent', () => {
  let component: ModalBusquedaTipoComprobanteComponent;
  let fixture: ComponentFixture<ModalBusquedaTipoComprobanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaTipoComprobanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaTipoComprobanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
