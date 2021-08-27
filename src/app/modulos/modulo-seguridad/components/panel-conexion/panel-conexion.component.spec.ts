import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelConexionComponent } from './panel-conexion.component';

describe('PanelConexionComponent', () => {
  let component: PanelConexionComponent;
  let fixture: ComponentFixture<PanelConexionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelConexionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelConexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
