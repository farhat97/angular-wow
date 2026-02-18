import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayableClasses } from './playable-classes';

describe('PlayableClasses', () => {
  let component: PlayableClasses;
  let fixture: ComponentFixture<PlayableClasses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayableClasses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayableClasses);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
