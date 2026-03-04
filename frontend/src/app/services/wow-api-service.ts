import { computed, DestroyRef, inject, Injectable, Signal, signal } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PlayableRace, PlayableRaceIndex } from "../../shared/types/PlayableRace";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { PlayableClass, PlayableClassView } from "../../shared/types/PlayableClass";
import { Observable } from "rxjs";

export interface ApiState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

@Injectable({
    providedIn: 'root'
})
export class WowApiService {

    private readonly destroyRef = inject(DestroyRef);
    // Approach using signals - keep track of responses with signals
    private readonly _racesState = signal<ApiState<PlayableRaceIndex[]>>({
        data: null,
        loading: false,
        error: null
    });
    private readonly _classesState = signal<ApiState<PlayableClassView[]>>({
        data: null,
        loading: false,
        error: null
    });

    // Readable signals: exposed to consumers
    readonly playableRaces = computed(() => this._racesState().data ?? []);
    readonly isRacesLoading = computed(() => this._racesState().loading);
    readonly isRacesError = computed(() => this._racesState().error);

    readonly playableClasses = computed(() => this._classesState().data ?? []);
    readonly isPlayableClassesLoading = computed(() => this._classesState().loading);
    readonly isClassesError = computed(() => this._classesState().error);
    
    constructor(private httpClient: HttpClient) {}

    getPlayableRaces(): void {
        this._racesState.set({ data: null, loading: true, error: null });
        
        const url = `/api/playable-race/index`;

        this.httpClient.get<any>(url).pipe(
            takeUntilDestroyed(this.destroyRef)
        ).subscribe({
            next: (response) => {
                console.log('races from subscribe (service) = ', response);
                this._racesState.set({
                    data: response,
                    loading: false,
                    error: null
                });
            },
            error: (error) => {
                console.log('error from subscribe (service)', error);
                this._racesState.set({
                    data: null,
                    loading: false,
                    error: error.message
                });
            }
        });
    }

    getSelectedPlayableRace(raceId: number): Observable<PlayableRace> {
        const url = `/api/playable-race/${raceId}`;
        
        return this.httpClient.get<PlayableRace>(url);
    }


    getPlayableClasses(): void {
        const url = `/api/playable-class/index`;

        this.httpClient.get<any>(url).pipe(
            takeUntilDestroyed(this.destroyRef)
        ).subscribe({
            next: (response) => {
                console.log('classes from subscribe (service) = ', response);
                this._classesState.set({
                    data: response,
                    loading: false,
                    error: null
                });
            },
            error: (error) => {
                console.log('error from subscribe (service)', error);
                this._classesState.set({
                    data: null,
                    loading: false,
                    error: error.message
                });
            }
        });
    }

    getPlayableClassesByRace(raceId: number): Observable<PlayableClassView[]> {
        const url = `/api/playable-race/${raceId}/playable-classes`;

        return this.httpClient.get<any>(url);
    }

    getPlayableClassById(classId: number): Observable<PlayableClass> {
        const url = `/api/playable-class/${classId}`;
        
        return this.httpClient.get<any>(url);
    }

    findRaceById(raceId: number): PlayableRaceIndex | undefined {
        return this._racesState().data?.find(r => r.id === raceId);
    }
}
