import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubstitutionPatternSingleGameComponent } from './substitution-pattern-single-game.component';

describe('SubstitutionPatternSingleGameComponent', () => {
  let component: SubstitutionPatternSingleGameComponent;
  let fixture: ComponentFixture<SubstitutionPatternSingleGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubstitutionPatternSingleGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubstitutionPatternSingleGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
