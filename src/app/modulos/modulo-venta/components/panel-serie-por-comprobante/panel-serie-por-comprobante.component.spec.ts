import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSeriePorComprobanteComponent } from './panel-serie-por-comprobante.component';

describe('PanelSeriePorComprobanteComponent', () => {
  let component: PanelSeriePorComprobanteComponent;
  let fixture: ComponentFixture<PanelSeriePorComprobanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelSeriePorComprobanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSeriePorComprobanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
