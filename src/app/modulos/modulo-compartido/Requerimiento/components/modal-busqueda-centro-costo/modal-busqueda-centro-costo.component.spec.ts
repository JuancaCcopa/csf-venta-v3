import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaCentroCostoComponent } from './modal-busqueda-centro-costo.component';

describe('ModalBusquedaCentroCostoComponent', () => {
  let component: ModalBusquedaCentroCostoComponent;
  let fixture: ComponentFixture<ModalBusquedaCentroCostoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaCentroCostoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaCentroCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
