import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelUbicacionPorUsuarioComponent } from './panel-ubicacion-por-usuario.component';

describe('PanelUbicacionPorUsuarioComponent', () => {
  let component: PanelUbicacionPorUsuarioComponent;
  let fixture: ComponentFixture<PanelUbicacionPorUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelUbicacionPorUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelUbicacionPorUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
