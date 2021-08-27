import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelOpcionPorPerfilComponent } from './panel-opcion-por-perfil.component';

describe('PanelOpcionPorPerfilComponent', () => {
  let component: PanelOpcionPorPerfilComponent;
  let fixture: ComponentFixture<PanelOpcionPorPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelOpcionPorPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelOpcionPorPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
