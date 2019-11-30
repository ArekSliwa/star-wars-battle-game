import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleUnitSwitcherComponent } from './battle-unit-switcher.component';

describe('BattleUnitSwitcherComponent', () => {
  let component: BattleUnitSwitcherComponent;
  let fixture: ComponentFixture<BattleUnitSwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleUnitSwitcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleUnitSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
