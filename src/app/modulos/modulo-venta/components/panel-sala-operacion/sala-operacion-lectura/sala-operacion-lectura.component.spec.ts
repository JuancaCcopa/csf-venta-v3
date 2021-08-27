import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaOperacionLecturaComponent } from './sala-operacion-lectura.component';

describe('SalaOperacionLecturaComponent', () => {
  let component: SalaOperacionLecturaComponent;
  let fixture: ComponentFixture<SalaOperacionLecturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaOperacionLecturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaOperacionLecturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
