import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobacionRequerimientoEconomatoComponent } from './aprobacion-requerimiento-economato.component';

describe('AprobacionRequerimientoEconomatoComponent', () => {
  let component: AprobacionRequerimientoEconomatoComponent;
  let fixture: ComponentFixture<AprobacionRequerimientoEconomatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprobacionRequerimientoEconomatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobacionRequerimientoEconomatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
