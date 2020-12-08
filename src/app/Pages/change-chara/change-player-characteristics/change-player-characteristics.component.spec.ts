import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePlayerCharacteristicsComponent } from './change-player-characteristics.component';

describe('ChangePlayerCharacteristicsComponent', () => {
  let component: ChangePlayerCharacteristicsComponent;
  let fixture: ComponentFixture<ChangePlayerCharacteristicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePlayerCharacteristicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePlayerCharacteristicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
