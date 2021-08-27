import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaGenericoComponent } from './modal-busqueda-generico.component';

describe('ModalBusquedaGenericoComponent', () => {
  let component: ModalBusquedaGenericoComponent;
  let fixture: ComponentFixture<ModalBusquedaGenericoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaGenericoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
