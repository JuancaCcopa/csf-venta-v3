import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaVerComponent } from './venta-ver.component';

describe('VentaVerComponent', () => {
  let component: VentaVerComponent;
  let fixture: ComponentFixture<VentaVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentaVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
