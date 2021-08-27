import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RequerimientoListadoComponent } from './requerimiento-listado.component';

describe('RequerimientoListadoComponent', () => {
  let component: RequerimientoListadoComponent;
  let fixture: ComponentFixture<RequerimientoListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequerimientoListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequerimientoListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
