import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarRequerimientoComponent } from './registrar-requerimiento.component';

describe('RegistrarRequerimientoComponent', () => {
  let component: RegistrarRequerimientoComponent;
  let fixture: ComponentFixture<RegistrarRequerimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarRequerimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarRequerimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
