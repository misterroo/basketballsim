import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedSettingQtrTableComponent } from './advanced-setting-qtr-table.component';

describe('AdvancedSettingQtrTableComponent', () => {
  let component: AdvancedSettingQtrTableComponent;
  let fixture: ComponentFixture<AdvancedSettingQtrTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedSettingQtrTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedSettingQtrTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
