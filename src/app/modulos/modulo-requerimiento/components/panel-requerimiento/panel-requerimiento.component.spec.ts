import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelRequerimientoComponent } from './panel-requerimiento.component';

describe('PanelRequerimientoComponent', () => {
  let component: PanelRequerimientoComponent;
  let fixture: ComponentFixture<PanelRequerimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelRequerimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelRequerimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
