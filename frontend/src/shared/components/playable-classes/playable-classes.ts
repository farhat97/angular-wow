import { Component, effect, inject, OnInit } from '@angular/core';
import { UserSelectionStore } from '../../../app/store/user-selection-store';
import { WowApiService } from '../../../app/services/wow-api-service';
import { PlayableClassIndex } from '../../types/PlayableClass';

@Component({
  selector: 'app-playable-classes',
  imports: [],
  templateUrl: './playable-classes.html',
  styleUrl: './playable-classes.css',
})
export class PlayableClasses implements OnInit {
  
  readonly store = inject(UserSelectionStore);
  readonly wowApiService = inject(WowApiService);
  
  ngOnInit(): void {
    // this.wowApiService.getPlayableClasses();

    // TODO: rework
    // this.getPlayableClasses();
  }

  constructor() {
    effect(() => {
      const selectedRace = this.store.selectedRace();

      if (selectedRace?.playable_classes) {
        this.getPlayableClasses(selectedRace.playable_classes);
      }
    });
  }
  

  getPlayableClasses(playableClasses: PlayableClassIndex[]): void {
    // const racePlayableClasses: PlayableClassIndex[] | undefined = this.store.selectedRace()?.playable_classes;
    console.log('calling...');

    playableClasses.forEach((playableClass) => {
      this.wowApiService.getPlayableClassById(playableClass.id).subscribe({
        next: (fullClass) => {
          this.store.addPlayableClass(fullClass);
        },
        error: (err) => {
          console.log('Error getting full class = ', err);
        }
      });
    });
  }

}
