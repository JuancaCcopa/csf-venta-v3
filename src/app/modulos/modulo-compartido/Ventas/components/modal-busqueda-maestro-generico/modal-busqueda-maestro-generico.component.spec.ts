import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaMaestroGenericoComponent } from './modal-busqueda-maestro-generico.component';

describe('ModalBusquedaMaestroGenericoComponent', () => {
  let component: ModalBusquedaMaestroGenericoComponent;
  let fixture: ComponentFixture<ModalBusquedaMaestroGenericoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaMaestroGenericoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaMaestroGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
