import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelTomaInventarioComponent } from './panel-toma-inventario.component';

describe('PanelTomaInventarioComponent', () => {
  let component: PanelTomaInventarioComponent;
  let fixture: ComponentFixture<PanelTomaInventarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelTomaInventarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelTomaInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
