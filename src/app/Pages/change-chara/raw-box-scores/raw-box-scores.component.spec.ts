import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawBoxScoresComponent } from './raw-box-scores.component';

describe('RawBoxScoresComponent', () => {
  let component: RawBoxScoresComponent;
  let fixture: ComponentFixture<RawBoxScoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawBoxScoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawBoxScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
