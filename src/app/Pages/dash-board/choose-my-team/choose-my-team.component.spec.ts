import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseMyTeamComponent } from './choose-my-team.component';

describe('ChooseMyTeamComponent', () => {
  let component: ChooseMyTeamComponent;
  let fixture: ComponentFixture<ChooseMyTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseMyTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseMyTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
