import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CantidadEditarComponent } from './cantidad-editar.component';

describe('CantidadEditarComponent', () => {
  let component: CantidadEditarComponent;
  let fixture: ComponentFixture<CantidadEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CantidadEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CantidadEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
