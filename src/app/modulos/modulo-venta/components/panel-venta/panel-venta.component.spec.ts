import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelVentaComponent } from './panel-venta.component';

describe('PanelVentaComponent', () => {
  let component: PanelVentaComponent;
  let fixture: ComponentFixture<PanelVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
