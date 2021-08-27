import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValeSalidaVerComponent } from './vale-salida-ver-component';

describe('ValeSalidaVerComponent', () => {
  let component: ValeSalidaVerComponent;
  let fixture: ComponentFixture<ValeSalidaVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValeSalidaVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValeSalidaVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
