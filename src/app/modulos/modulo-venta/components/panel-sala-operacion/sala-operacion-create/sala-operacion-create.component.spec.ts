import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaOperacionCreateComponent } from './sala-operacion-create.component';

describe('SalaOperacionCreateComponent', () => {
  let component: SalaOperacionCreateComponent;
  let fixture: ComponentFixture<SalaOperacionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaOperacionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaOperacionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
