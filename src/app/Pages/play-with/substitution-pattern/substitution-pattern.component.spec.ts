import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubstitutionPatternComponent } from './substitution-pattern.component';

describe('SubstitutionPatternComponent', () => {
  let component: SubstitutionPatternComponent;
  let fixture: ComponentFixture<SubstitutionPatternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubstitutionPatternComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubstitutionPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
