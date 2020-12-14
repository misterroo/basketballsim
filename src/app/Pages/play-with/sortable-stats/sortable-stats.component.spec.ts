import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortableStatsComponent } from './sortable-stats.component';

describe('SortableStatsComponent', () => {
  let component: SortableStatsComponent;
  let fixture: ComponentFixture<SortableStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortableStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortableStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
