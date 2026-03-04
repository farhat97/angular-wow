import { Component, effect, inject, OnInit } from '@angular/core';
import { UserSelectionStore } from '../../../app/store/user-selection-store';
import { WowApiService } from '../../../app/services/wow-api-service';
import { PlayableClass } from '../playable-class/playable-class';

@Component({
  selector: 'app-playable-classes',
  imports: [PlayableClass],
  templateUrl: './playable-classes.html',
  styleUrl: './playable-classes.css',
})
export class PlayableClasses {
  
  readonly store = inject(UserSelectionStore);
  readonly wowApiService = inject(WowApiService);

  constructor() {
    effect(() => {
      const selectedRace = this.store.selectedRace();

      if (selectedRace?.playable_classes) {
        this.wowApiService.getPlayableClassesByRace(selectedRace.id).subscribe({
          next: (res) => {
            console.log('got playable classes by race = ', res);
            this.store.updateSelectedRaceClasses(res);
          }
        })
      }
    });
  }
  
}
