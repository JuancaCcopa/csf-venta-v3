import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaTipoVentaComponent } from './modal-busqueda-tipo-venta.component';

describe('ModalBusquedaTipoVentaComponent', () => {
  let component: ModalBusquedaTipoVentaComponent;
  let fixture: ComponentFixture<ModalBusquedaTipoVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaTipoVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaTipoVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
