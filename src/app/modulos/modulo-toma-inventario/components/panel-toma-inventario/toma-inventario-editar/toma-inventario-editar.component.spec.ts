import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TomaInvetarioEditarComponent } from './toma-inventario-editar.component';

describe('TomaInvetarioEditarComponent', () => {
  let component: TomaInvetarioEditarComponent;
  let fixture: ComponentFixture<TomaInvetarioEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TomaInvetarioEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TomaInvetarioEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
