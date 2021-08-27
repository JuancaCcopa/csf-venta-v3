import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelVentaAutomaticoComponent } from './panel-venta-automatico.component';

describe('PanelVentaAutomaticoComponent', () => {
  let component: PanelVentaAutomaticoComponent;
  let fixture: ComponentFixture<PanelVentaAutomaticoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelVentaAutomaticoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelVentaAutomaticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
