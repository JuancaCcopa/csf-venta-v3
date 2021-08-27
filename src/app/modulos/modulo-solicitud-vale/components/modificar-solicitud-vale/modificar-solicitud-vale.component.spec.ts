import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarSolicitudValeComponent } from './modificar-solicitud-vale.component';

describe('ModificarSolicitudValeComponent', () => {
  let component: ModificarSolicitudValeComponent;
  let fixture: ComponentFixture<ModificarSolicitudValeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarSolicitudValeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarSolicitudValeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
