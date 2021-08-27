import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarRequerimientoComponent } from './modificar-requerimiento.component';

describe('ModificarRequerimientoComponent', () => {
  let component: ModificarRequerimientoComponent;
  let fixture: ComponentFixture<ModificarRequerimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarRequerimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarRequerimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
