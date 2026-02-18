import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WowApiService } from '../../app/services/wow-api-service';
import { UserSelectionStore } from '../../app/store/user-selection-store';
import { PlayableRace } from '../../shared/types/PlayableRace';
import { PlayableClasses } from '../../shared/components/playable-classes/playable-classes';

@Component({
  selector: 'app-main-dashboard',
  imports: [CommonModule, PlayableClasses],
  providers: [UserSelectionStore],
  templateUrl: './main-dashboard.html',
  styleUrl: './main-dashboard.css',
})
export class MainDashboard implements OnInit {

  readonly store = inject(UserSelectionStore);
  readonly wowApiService = inject(WowApiService);

  public onSelectRace(event: any): void {
    const raceId: number = Number(event.target.value);

    // TODO: this code's Race has ID and name only, but Blizzard's response has a couple extra metadata type things
    // Because of this, I have to initialize the object before setting the store's state
    const selectedRace = this.wowApiService.findRaceById(raceId);

    if (selectedRace) {
      const race: PlayableRace = {
        id: selectedRace.id,
        name: selectedRace.name
      };
      this.store.updateSelectedRace(race);
    }
    else
      console.log('Error - not able to get selected race');
  }

  // Signal Approach
  ngOnInit(): void {
    this.wowApiService.getPlayableRaces();
  }

}
