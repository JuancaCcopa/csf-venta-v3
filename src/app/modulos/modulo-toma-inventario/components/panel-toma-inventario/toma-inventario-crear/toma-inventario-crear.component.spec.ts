import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TomaInvetarioCrearComponent } from './toma-inventario-crear-component';

describe('TomaInvetarioCrearComponent', () => {
  let component: TomaInvetarioCrearComponent;
  let fixture: ComponentFixture<TomaInvetarioCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TomaInvetarioCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TomaInvetarioCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
