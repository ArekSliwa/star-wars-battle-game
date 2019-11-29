import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwSVGIconComponent } from './icon.component';

describe('IconComponent', () => {
  let component: SwSVGIconComponent;
  let fixture: ComponentFixture<SwSVGIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwSVGIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwSVGIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
