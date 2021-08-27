import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudTrasladoCrearComponent } from './solicitud-traslado-crear.component';

describe('SolicitudTrasladoCrearComponent', () => {
  let component: SolicitudTrasladoCrearComponent;
  let fixture: ComponentFixture<SolicitudTrasladoCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudTrasladoCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudTrasladoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
