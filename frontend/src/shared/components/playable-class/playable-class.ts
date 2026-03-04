import { Component, Input } from '@angular/core';
import { PlayableClassView } from '../../types/PlayableClass';

@Component({
  selector: 'app-playable-class',
  imports: [],
  templateUrl: './playable-class.html',
  styleUrl: './playable-class.css',
})
export class PlayableClass {

  @Input() playableClass: PlayableClassView | null = null;

}
