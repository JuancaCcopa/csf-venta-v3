import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaValeDeliveryComponent } from './modal-busqueda-vale-delivery.component';

describe('ModalBusquedaValeDeliveryComponent', () => {
  let component: ModalBusquedaValeDeliveryComponent;
  let fixture: ComponentFixture<ModalBusquedaValeDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaValeDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaValeDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
