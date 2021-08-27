import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSolicitudTraslaComponent } from './panel-solicitud-traslado.component';

describe('PanelSolicitudTraslaComponent', () => {
  let component: PanelSolicitudTraslaComponent;
  let fixture: ComponentFixture<PanelSolicitudTraslaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelSolicitudTraslaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSolicitudTraslaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
