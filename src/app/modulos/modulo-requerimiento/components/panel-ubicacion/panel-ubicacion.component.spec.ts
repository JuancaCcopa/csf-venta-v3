import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelUbicacionComponent } from './panel-ubicacion.component';

describe('PanelUbicacionComponent', () => {
  let component: PanelUbicacionComponent;
  let fixture: ComponentFixture<PanelUbicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelUbicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
