import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBoardContainerComponent } from './game-board.container';

describe('GameBoardContainerComponent', () => {
  let component: GameBoardContainerComponent;
  let fixture: ComponentFixture<GameBoardContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameBoardContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBoardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
