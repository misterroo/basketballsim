import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawStatsComponent } from './raw-stats.component';

describe('RawStatsComponent', () => {
  let component: RawStatsComponent;
  let fixture: ComponentFixture<RawStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
