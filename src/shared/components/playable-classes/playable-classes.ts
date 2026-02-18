import { Component, inject, OnInit } from '@angular/core';
import { UserSelectionStore } from '../../../app/store/user-selection-store';
import { WowApiService } from '../../../app/services/wow-api-service';

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
    this.wowApiService.getPlayableClasses();
  }

}
