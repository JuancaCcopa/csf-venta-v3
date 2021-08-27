import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSeguimientoComponent } from './panel-seguimiento.component';

describe('PanelSeguimientoComponent', () => {
  let component: PanelSeguimientoComponent;
  let fixture: ComponentFixture<PanelSeguimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelSeguimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
