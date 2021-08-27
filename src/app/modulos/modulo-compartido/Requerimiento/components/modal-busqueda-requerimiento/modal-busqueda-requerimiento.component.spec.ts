import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaRequerimientoComponent } from './modal-busqueda-requerimiento.component';

describe('ModalBusquedaRequerimientoComponent', () => {
  let component: ModalBusquedaRequerimientoComponent;
  let fixture: ComponentFixture<ModalBusquedaRequerimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaRequerimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaRequerimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
