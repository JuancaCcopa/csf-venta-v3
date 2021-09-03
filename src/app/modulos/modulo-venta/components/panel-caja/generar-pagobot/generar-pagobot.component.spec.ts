import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarPagoBotComponent } from './generar-pagobot.component';

describe('GenerarPagoBotComponent', () => {
  let component: GenerarPagoBotComponent;
  let fixture: ComponentFixture<GenerarPagoBotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarPagoBotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarPagoBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
