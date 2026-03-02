import { PlayableClassIndex } from "./PlayableClass";

export interface PlayableRaceIndex {
    id: number;
    name: string;
}

export interface PlayableRace {
  id: number;
  name: string;
  gender_name: GenderName;
  faction: Faction;
  is_selectable: boolean;
  is_allied_race: boolean;
  playable_classes: PlayableClassIndex[];
  racial_spells: NamedApiResource[];
}

export interface GenderName {
  male: string;
  female: string;
}

export interface Faction {
  type: 'HORDE' | 'ALLIANCE'; // stricter typing
  name: string;
}

// TODO: revise
export interface NamedApiResource {
  key: ApiKey;
  name: string;
  id: number;
}

export interface ApiKey {
  href: string;
}

