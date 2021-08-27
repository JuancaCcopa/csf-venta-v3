import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSistemaComponent } from './panel-sistema.component';

describe('PanelSistemaComponent', () => {
  let component: PanelSistemaComponent;
  let fixture: ComponentFixture<PanelSistemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelSistemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
