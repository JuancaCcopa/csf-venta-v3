import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCompartidoComponent } from './table-compartido.component';

describe('TableCompartidoComponent', () => {
  let component: TableCompartidoComponent;
  let fixture: ComponentFixture<TableCompartidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCompartidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCompartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
