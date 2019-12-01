import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleUnitSwitcherDialogContainerComponent } from './battle-unit-switcher-dialog.container';

describe('BattleUnitSwitcherDialogContainerComponent', () => {
  let component: BattleUnitSwitcherDialogContainerComponent;
  let fixture: ComponentFixture<BattleUnitSwitcherDialogContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleUnitSwitcherDialogContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleUnitSwitcherDialogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
