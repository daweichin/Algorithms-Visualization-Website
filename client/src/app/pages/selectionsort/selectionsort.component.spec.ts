import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionsortComponent } from './selectionsort.component';

describe('SelectionsortComponent', () => {
  let component: SelectionsortComponent;
  let fixture: ComponentFixture<SelectionsortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionsortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionsortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
