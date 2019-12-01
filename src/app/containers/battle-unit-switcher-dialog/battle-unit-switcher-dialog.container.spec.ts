import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleUnitSwitcherDialogComponent } from './battle-unit-switcher-dialog.component';

describe('BattleUnitSwitcherDialogComponent', () => {
  let component: BattleUnitSwitcherDialogComponent;
  let fixture: ComponentFixture<BattleUnitSwitcherDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleUnitSwitcherDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleUnitSwitcherDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
