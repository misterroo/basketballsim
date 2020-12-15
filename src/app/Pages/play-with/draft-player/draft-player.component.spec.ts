import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftPlayerComponent } from './draft-player.component';

describe('DraftPlayerComponent', () => {
  let component: DraftPlayerComponent;
  let fixture: ComponentFixture<DraftPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
