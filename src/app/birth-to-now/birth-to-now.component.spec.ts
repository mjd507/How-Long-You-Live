import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthToNowComponent } from './birth-to-now.component';

describe('BirthToNowComponent', () => {
  let component: BirthToNowComponent;
  let fixture: ComponentFixture<BirthToNowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirthToNowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthToNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
