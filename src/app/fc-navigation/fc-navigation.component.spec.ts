import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FcNavigationComponent } from './fc-navigation.component';

describe('FcNavigationComponent', () => {
  let component: FcNavigationComponent;
  let fixture: ComponentFixture<FcNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FcNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FcNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
