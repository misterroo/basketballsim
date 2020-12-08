import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortableBoxScoreComponent } from './sortable-box-score.component';

describe('SortableBoxScoreComponent', () => {
  let component: SortableBoxScoreComponent;
  let fixture: ComponentFixture<SortableBoxScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortableBoxScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortableBoxScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
