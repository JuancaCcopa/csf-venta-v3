import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListaAprobadoresComponent } from './table-lista-aprobadores.component';

describe('TableListaAprobadoresComponent', () => {
  let component: TableListaAprobadoresComponent;
  let fixture: ComponentFixture<TableListaAprobadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableListaAprobadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListaAprobadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
