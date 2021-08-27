import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelOpcionComponent } from './panel-opcion.component';

describe('PanelOpcionComponent', () => {
  let component: PanelOpcionComponent;
  let fixture: ComponentFixture<PanelOpcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelOpcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelOpcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
