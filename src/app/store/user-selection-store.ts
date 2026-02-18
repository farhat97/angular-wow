import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { PlayableRace } from "../../shared/types/PlayableRace";

type UserSelectionState = {
    selectedRace: PlayableRace | null;
};

const initialState: UserSelectionState = { selectedRace: null };

export const UserSelectionStore = signalStore(
    withState(initialState),
    withMethods((store) => ({
        updateSelectedRace(race: PlayableRace): void {
            patchState(store, { selectedRace: race });
        }
    }))
);
