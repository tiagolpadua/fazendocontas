import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FcHeaderComponent } from './fc-header.component';

describe('FcHeaderComponent', () => {
  let component: FcHeaderComponent;
  let fixture: ComponentFixture<FcHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FcHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FcHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
