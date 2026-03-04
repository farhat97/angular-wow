import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayableClass } from './playable-class';

describe('PlayableClass', () => {
  let component: PlayableClass;
  let fixture: ComponentFixture<PlayableClass>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayableClass]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayableClass);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
