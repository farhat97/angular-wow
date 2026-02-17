import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { Race } from "../../shared/types/Race";

type UserSelectionState = {
    selectedRace: Race | null;
};

const initialState: UserSelectionState = { selectedRace: null };

export const UserSelectionStore = signalStore(
    withState(initialState),
    withMethods((store) => ({
        updateSelectedRace(race: Race): void {
            patchState(store, { selectedRace: race });
        }
    }))
);
