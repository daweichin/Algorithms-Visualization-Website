import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MergesortComponent } from './mergesort.component';

describe('MergesortComponent', () => {
  let component: MergesortComponent;
  let fixture: ComponentFixture<MergesortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MergesortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MergesortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
