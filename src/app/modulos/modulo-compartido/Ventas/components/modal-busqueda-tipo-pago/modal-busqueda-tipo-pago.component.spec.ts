import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalBusquedaTipoPagoComponent } from './modal-busqueda-tipo-pago.component';

describe('ModalBusquedaTipoPagoComponent', () => {
  let component: ModalBusquedaTipoPagoComponent;
  let fixture: ComponentFixture<ModalBusquedaTipoPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaTipoPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaTipoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
