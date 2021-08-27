import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TomaInvetarioGuardarComponent } from './toma-inventario-guardar.component';

describe('TomaInvetarioGuardarComponent', () => {
  let component: TomaInvetarioGuardarComponent;
  let fixture: ComponentFixture<TomaInvetarioGuardarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TomaInvetarioGuardarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TomaInvetarioGuardarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
