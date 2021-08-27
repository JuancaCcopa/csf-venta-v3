import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarValeSalidaComponent } from './registrar-vale-salida.component';

describe('RegistrarValeSalidaComponent', () => {
  let component: RegistrarValeSalidaComponent;
  let fixture: ComponentFixture<RegistrarValeSalidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarValeSalidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarValeSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
