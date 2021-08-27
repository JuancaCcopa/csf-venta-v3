import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSolicitudTraslaExtComponent } from './panel-solicitud-traslado-ext.component';

describe('PanelSolicitudTraslaExtComponent', () => {
  let component: PanelSolicitudTraslaExtComponent;
  let fixture: ComponentFixture<PanelSolicitudTraslaExtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelSolicitudTraslaExtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSolicitudTraslaExtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
