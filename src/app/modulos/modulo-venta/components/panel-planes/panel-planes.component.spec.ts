import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPlanesComponent } from './panel-planes.component';

describe('PanelPlanesComponent', () => {
  let component: PanelPlanesComponent;
  let fixture: ComponentFixture<PanelPlanesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelPlanesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
