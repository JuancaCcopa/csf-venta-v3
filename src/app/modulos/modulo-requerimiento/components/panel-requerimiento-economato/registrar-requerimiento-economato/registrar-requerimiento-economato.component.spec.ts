import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarRequerimientoEconomatoComponent } from './registrar-requerimiento-economato.component';

describe('RegistrarRequerimientoEconomatoComponent', () => {
  let component: RegistrarRequerimientoEconomatoComponent;
  let fixture: ComponentFixture<RegistrarRequerimientoEconomatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarRequerimientoEconomatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarRequerimientoEconomatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
