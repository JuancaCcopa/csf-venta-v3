import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPersonaComponent } from './panel-persona.component';

describe('PanelPersonaComponent', () => {
  let component: PanelPersonaComponent;
  let fixture: ComponentFixture<PanelPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
