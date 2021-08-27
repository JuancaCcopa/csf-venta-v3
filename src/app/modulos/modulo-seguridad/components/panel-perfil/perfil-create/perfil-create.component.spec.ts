import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilCreateComponent } from './perfil-create.component';

describe('PerfilCreateComponent', () => {
  let component: PerfilCreateComponent;
  let fixture: ComponentFixture<PerfilCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
