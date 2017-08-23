import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FcSelecaoCategoriasComponent } from './fc-selecao-categorias.component';

describe('FcSelecaoCategoriasComponent', () => {
  let component: FcSelecaoCategoriasComponent;
  let fixture: ComponentFixture<FcSelecaoCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FcSelecaoCategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FcSelecaoCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
