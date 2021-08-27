import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnSalirComponent } from './btn-salir.component';

describe('BtnSalirComponent', () => {
  let component: BtnSalirComponent;
  let fixture: ComponentFixture<BtnSalirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnSalirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnSalirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
