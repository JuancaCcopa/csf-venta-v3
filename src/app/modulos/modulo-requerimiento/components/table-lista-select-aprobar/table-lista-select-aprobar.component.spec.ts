import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListaSelectAprobarComponent } from './table-lista-select-aprobar.component';

describe('TableListaSelectAprobarComponent', () => {
  let component: TableListaSelectAprobarComponent;
  let fixture: ComponentFixture<TableListaSelectAprobarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableListaSelectAprobarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListaSelectAprobarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
