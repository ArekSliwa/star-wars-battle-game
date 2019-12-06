import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameFightArenaComponent } from './game-fight-arena.component';

describe('GameFightArenaComponent', () => {
  let component: GameFightArenaComponent;
  let fixture: ComponentFixture<GameFightArenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameFightArenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameFightArenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
