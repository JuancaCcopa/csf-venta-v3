import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaMedicoComponent } from './modal-busqueda-medico.component';

describe('ModalBusquedaMedicoComponent', () => {
  let component: ModalBusquedaMedicoComponent;
  let fixture: ComponentFixture<ModalBusquedaMedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaMedicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
