import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSolicitudValeComponent } from './panel-solicitud-vale.component';

describe('PanelSolicitudValeComponent', () => {
  let component: PanelSolicitudValeComponent;
  let fixture: ComponentFixture<PanelSolicitudValeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelSolicitudValeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSolicitudValeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
