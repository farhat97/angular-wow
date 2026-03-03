const API_BASE_URL = 'https://us.api.blizzard.com';
const NAMESPACE = 'static-classic-us';
const LOCALE = 'en_US';

const params = {
  'namespace': NAMESPACE,
  'locale': LOCALE
};
const headers = {
  'Authorization': `Bearer ${BEARER_TOKEN}`
};

import { BEARER_TOKEN } from './api-creds';
import axios from 'axios';
import type { PlayableRaceIndex, PlayableRace } from './types/PlayableRace';
import type { PlayableClass, PlayableClassMedia, PlayableClassView } from './types/PlayableClass';

export async function getPlayableRaces(): Promise<PlayableRaceIndex[]> {
    
    const response = await fetch(
      `${API_BASE_URL}/data/wow/playable-race/index?namespace=${NAMESPACE}&locale=${LOCALE}`, {
          headers: {
              "Authorization": `Bearer ${BEARER_TOKEN}`
          }
      }
    );
    
    const data: any = await response.json();
    
    return data.races.map((race: any) => ({
      id: race.id,
      name: race.name
    }));
}

export async function getPlayableRace(raceId: number): Promise<PlayableRace> {

  const response = await axios.get<PlayableRace>(`${API_BASE_URL}/data/wow/playable-race/${raceId}`, { headers, params });
  console.log('Playable Race = ', response.data);

  // TODO: handle errors?
  return response.data;
}

export async function getPlayableClassById(classId: number): Promise<PlayableClass> {
  const response = await axios.get<PlayableClass>(`${API_BASE_URL}/data/wow/playable-class/${classId}`, { headers, params });

  console.log('Playable Class = ', response.data);

  return response.data;
}

export async function getAllPlayableClassesForRace(raceId: number): Promise<PlayableClassView[]> {
  const race: PlayableRace = await getPlayableRace(raceId);

  if (!race) return [ ];

  let classIds: number[] = race.playable_classes.map((c) => c.id);

  // Get classes
  const classes: PlayableClass[] = await Promise.all(
    classIds.map((id) => getPlayableClassById(id))
  );

  // Get Media
  const mediaList: PlayableClassMedia[] = await Promise.all(
    classIds.map((id) => getClassMedia(id))
  );

  // Construct response
  const classViews: PlayableClassView[] = classes.map((c) => {
    const classMedia = mediaList.find((m) => m.id === c.id);

    const iconAsset = classMedia?.assets.find((asset) => asset.key === 'icon');

    return {
      id: c.id,
      name: c.name,
      power_type: c.power_type,
      media_url: iconAsset?.value || ''
    }
  });
  

  return classViews;
}

async function getClassMedia(classId: number): Promise<PlayableClassMedia> {
  const response = await axios.get<PlayableClassMedia>(`${API_BASE_URL}/data/wow/media/playable-class/${classId}`, { headers, params });

  return response.data;
}