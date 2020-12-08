import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualPlayerStatisticsComponent } from './actual-player-statistics.component';

describe('ActualPlayerStatisticsComponent', () => {
  let component: ActualPlayerStatisticsComponent;
  let fixture: ComponentFixture<ActualPlayerStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualPlayerStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualPlayerStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
