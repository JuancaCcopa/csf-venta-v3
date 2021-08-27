import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaUsuarioComponent } from './modal-busqueda-usuario.component';

describe('ModalBusquedaUsuarioComponent', () => {
  let component: ModalBusquedaUsuarioComponent;
  let fixture: ComponentFixture<ModalBusquedaUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
