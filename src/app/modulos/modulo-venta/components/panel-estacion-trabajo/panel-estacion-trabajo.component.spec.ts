import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelEstacionTrabajoComponent } from './panel-estacion-trabajo.component';

describe('PanelEstacionTrabajoComponent', () => {
  let component: PanelEstacionTrabajoComponent;
  let fixture: ComponentFixture<PanelEstacionTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelEstacionTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelEstacionTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
