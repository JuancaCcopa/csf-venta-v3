import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelCajaComponent } from './panel-caja.component';

describe('PanelCajaComponent', () => {
  let component: PanelCajaComponent;
  let fixture: ComponentFixture<PanelCajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelCajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
