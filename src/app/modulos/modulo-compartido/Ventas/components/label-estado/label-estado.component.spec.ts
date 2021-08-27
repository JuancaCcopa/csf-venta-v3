import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelEstadoComponent } from './label-estado.component';

describe('LabelEstadoComponent', () => {
  let component: LabelEstadoComponent;
  let fixture: ComponentFixture<LabelEstadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelEstadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
