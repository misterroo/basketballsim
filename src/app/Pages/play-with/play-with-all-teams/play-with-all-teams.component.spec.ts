import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayWithAllTeamsComponent } from './play-with-all-teams.component';

describe('PlayWithAllTeamsComponent', () => {
  let component: PlayWithAllTeamsComponent;
  let fixture: ComponentFixture<PlayWithAllTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayWithAllTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayWithAllTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
