import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarUbicacionPorUsuarioComponent } from './registrar-ubicacion-por-usuario.component';

describe('RegistrarUbicacionPorUsuarioComponent', () => {
  let component: RegistrarUbicacionPorUsuarioComponent;
  let fixture: ComponentFixture<RegistrarUbicacionPorUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarUbicacionPorUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarUbicacionPorUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
