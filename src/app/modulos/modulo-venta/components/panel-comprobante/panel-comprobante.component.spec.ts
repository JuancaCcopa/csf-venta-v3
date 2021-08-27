import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelComprobanteComponent } from './panel-comprobante.component';

describe('PanelComprobanteComponent', () => {
  let component: PanelComprobanteComponent;
  let fixture: ComponentFixture<PanelComprobanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelComprobanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelComprobanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
