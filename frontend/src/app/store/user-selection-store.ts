import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { PlayableRace } from "../../shared/types/PlayableRace";
import { PlayableClass } from "../../shared/types/PlayableClass";

type UserSelectionState = {
    selectedRace: PlayableRace | null;
    selectedRaceClasses: PlayableClass[];
};

const initialState: UserSelectionState = { selectedRace: null, selectedRaceClasses: [ ] };

export const UserSelectionStore = signalStore(
    withState(initialState),
    withMethods((store) => ({
        updateSelectedRace(race: PlayableRace): void {
            patchState(store, { selectedRace: race });
        },
        addPlayableClass(playableClass: PlayableClass): void {
            patchState(store, { selectedRaceClasses: [...store.selectedRaceClasses(), playableClass] });
        }
    }))
);
