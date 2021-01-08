import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftPlayerSingleGameComponent } from './draft-player-single-game.component';

describe('DraftPlayerSingleGameComponent', () => {
  let component: DraftPlayerSingleGameComponent;
  let fixture: ComponentFixture<DraftPlayerSingleGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftPlayerSingleGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftPlayerSingleGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
