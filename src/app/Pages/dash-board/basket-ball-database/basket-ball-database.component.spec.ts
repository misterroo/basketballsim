import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketBallDatabaseComponent } from './basket-ball-database.component';

describe('BasketBallDatabaseComponent', () => {
  let component: BasketBallDatabaseComponent;
  let fixture: ComponentFixture<BasketBallDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketBallDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketBallDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
