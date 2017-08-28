import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FcSelecaoTipoComponent } from './fc-selecao-tipo.component';

describe('FcSelecaoTipoComponent', () => {
  let component: FcSelecaoTipoComponent;
  let fixture: ComponentFixture<FcSelecaoTipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FcSelecaoTipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FcSelecaoTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
