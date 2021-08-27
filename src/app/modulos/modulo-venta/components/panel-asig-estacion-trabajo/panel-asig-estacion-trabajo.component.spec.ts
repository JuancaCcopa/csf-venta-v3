import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAsigEstacionTrabajoComponent } from './panel-asig-estacion-trabajo.component';

describe('PanelAsigEstacionTrabajoComponent', () => {
  let component: PanelAsigEstacionTrabajoComponent;
  let fixture: ComponentFixture<PanelAsigEstacionTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelAsigEstacionTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelAsigEstacionTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
