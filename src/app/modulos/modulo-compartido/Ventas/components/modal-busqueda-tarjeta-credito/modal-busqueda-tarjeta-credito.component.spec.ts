import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalBusquedaTarjetaCreditoComponent } from './modal-busqueda-tarjeta-credito.component';

describe('ModalBusquedaTarjetaCreditoComponent', () => {
  let component: ModalBusquedaTarjetaCreditoComponent;
  let fixture: ComponentFixture<ModalBusquedaTarjetaCreditoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaTarjetaCreditoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaTarjetaCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
