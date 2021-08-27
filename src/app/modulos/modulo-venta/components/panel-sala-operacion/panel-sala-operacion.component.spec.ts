import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSalaOperacionComponent } from './panel-sala-operacion.component';

describe('PanelSalaOperacionComponent', () => {
  let component: PanelSalaOperacionComponent;
  let fixture: ComponentFixture<PanelSalaOperacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelSalaOperacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSalaOperacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
