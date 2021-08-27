import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPlanillaComponent } from './panel-planilla.component';

describe('PanelPlanillaComponent', () => {
  let component: PanelPlanillaComponent;
  let fixture: ComponentFixture<PanelPlanillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelPlanillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelPlanillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
