import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanillaCrearComponent } from './planilla-crear.component';

describe('PlanillaCrearComponent', () => {
  let component: PlanillaCrearComponent;
  let fixture: ComponentFixture<PlanillaCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanillaCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanillaCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
