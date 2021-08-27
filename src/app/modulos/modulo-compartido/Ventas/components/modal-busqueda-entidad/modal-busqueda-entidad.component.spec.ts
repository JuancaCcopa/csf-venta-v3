import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalBusquedaEntidadComponent } from './modal-busqueda-entidad.component';

describe('ModalBusquedaEntidadComponent', () => {
  let component: ModalBusquedaEntidadComponent;
  let fixture: ComponentFixture<ModalBusquedaEntidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaEntidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
