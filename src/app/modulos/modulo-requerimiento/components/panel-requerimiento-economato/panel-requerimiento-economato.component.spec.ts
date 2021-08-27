import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelRequerimientoEconomatoComponent } from './panel-requerimiento-economato.component';

describe('PanelRequerimientoEconomatoComponent', () => {
  let component: PanelRequerimientoEconomatoComponent;
  let fixture: ComponentFixture<PanelRequerimientoEconomatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelRequerimientoEconomatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelRequerimientoEconomatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
