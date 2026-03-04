import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { PlayableRace } from "../../shared/types/PlayableRace";
import { PlayableClassView } from "../../shared/types/PlayableClass";

type UserSelectionState = {
    selectedRace: PlayableRace | null;
    selectedRaceClasses: PlayableClassView[];
};

const initialState: UserSelectionState = { selectedRace: null, selectedRaceClasses: [ ] };

export const UserSelectionStore = signalStore(
    withState(initialState),
    withMethods((store) => ({
        updateSelectedRace(race: PlayableRace): void {
            patchState(store, { selectedRace: race });
        },
        updateSelectedRaceClasses(playableClasses: PlayableClassView[]): void {
            patchState(store, { selectedRaceClasses: playableClasses });
        }
    }))
);
