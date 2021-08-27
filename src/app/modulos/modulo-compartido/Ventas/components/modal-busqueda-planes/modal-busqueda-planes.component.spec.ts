import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaPlanesComponent } from './modal-busqueda-planes.component';

describe('ModalBusquedaPlanesComponent', () => {
  let component: ModalBusquedaPlanesComponent;
  let fixture: ComponentFixture<ModalBusquedaPlanesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaPlanesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBusquedaPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
