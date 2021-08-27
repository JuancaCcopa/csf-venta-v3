import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlAlmacenComponent } from './control-almacen.component';

describe('ControlAlmacenComponent', () => {
  let component: ControlAlmacenComponent;
  let fixture: ComponentFixture<ControlAlmacenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlAlmacenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
