import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {PlanillaUsuarioComponent } from './planilla-usuario.component'

describe('PlanillaUsuarioComponent', () => {
  let component: PlanillaUsuarioComponent;
  let fixture: ComponentFixture<PlanillaUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanillaUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanillaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
