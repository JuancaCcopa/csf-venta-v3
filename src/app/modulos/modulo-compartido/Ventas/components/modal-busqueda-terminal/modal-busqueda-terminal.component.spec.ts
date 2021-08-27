import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalBusquedaTerminalComponent } from './modal-busqueda-terminal.component';

describe('ModalBusquedaTerminalComponent', () => {
  let component: ModalBusquedaTerminalComponent;
  let fixture: ComponentFixture<ModalBusquedaTerminalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaTerminalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
