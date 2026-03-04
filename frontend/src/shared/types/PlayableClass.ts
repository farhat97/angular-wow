export interface PlayableClassIndex {
  name: string;
  id: number;
}

export interface PlayableClass {
  id: number;
  name: string;
  gender_name: GenderName;
  power_type: PowerType;
  specializations: Specialization[];
  media: Media;
  pvp_talent_slots: PvpTalentSlots;
}

export interface PlayableClassView {
  id: number;
  name: string;
  power_type: PowerType;
  media_url: string | null;
}

export interface GenderName {
  male: string;
  female: string;
}

export interface PowerType {
  key: KeyReference;
  name: string;
  id: number;
}

export interface Specialization {
  key: KeyReference;
  name: string;
  id: number;
}

export interface Media {
  key: KeyReference;
  id: number;
}

export interface PvpTalentSlots {
  href: string;
}

export interface KeyReference {
  href: string;
}
