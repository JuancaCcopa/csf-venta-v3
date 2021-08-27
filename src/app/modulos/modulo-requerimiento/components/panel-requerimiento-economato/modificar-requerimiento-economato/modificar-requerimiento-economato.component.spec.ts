import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarRequerimientoEconomatoComponent } from './modificar-requerimiento-economato.component';

describe('ModificarRequerimientoEconomatoComponent', () => {
  let component: ModificarRequerimientoEconomatoComponent;
  let fixture: ComponentFixture<ModificarRequerimientoEconomatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarRequerimientoEconomatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarRequerimientoEconomatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
