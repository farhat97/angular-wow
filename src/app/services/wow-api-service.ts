import { computed, DestroyRef, inject, Injectable, Signal, signal } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PlayableRace } from "../../shared/types/PlayableRace";
import { BEARER_TOKEN } from "../api-creds";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { PlayableClass } from "../../shared/types/PlayableClass";

export interface ApiState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

@Injectable({
    providedIn: 'root'
})
export class WowApiService {
    private readonly API_BASE_URL = 'https://us.api.blizzard.com';
    private readonly NAMESPACE = 'static-classic-us';
    private readonly LOCALE = 'en_US';

    private readonly destroyRef = inject(DestroyRef);
    // Approach using signals - keep track of responses with signals
    private readonly _racesState = signal<ApiState<PlayableRace[]>>({
        data: null,
        loading: false,
        error: null
    });
    private readonly _classesState = signal<ApiState<PlayableClass[]>>({
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
        
        const url = `${this.API_BASE_URL}/data/wow/playable-race/index`;

        const params = new HttpParams()
            .set('namespace', this.NAMESPACE)
            .set('locale', this.LOCALE);

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${BEARER_TOKEN}`
        });

        // TODO: maybe not use any? 
        this.httpClient.get<any>(url, { headers, params }).pipe(
            takeUntilDestroyed(this.destroyRef)
        ).subscribe({
            next: (response) => {
                console.log('races from subscribe (service) = ', response);
                this._racesState.set({
                    data: response.races,
                    loading: false,
                    error: null
                });
            },
            error: (error) => {
                console.log('error from subscribe (service)', error);
                this._racesState.set({
                    data: null,
                    loading: false,
                    error: error.errorMessage
                });
            }
        });
    }

    getPlayableClasses(): void {
        const url = `${this.API_BASE_URL}/data/wow/playable-class/index`;

        const params = new HttpParams()
            .set('namespace', this.NAMESPACE)
            .set('locale', this.LOCALE);

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${BEARER_TOKEN}`
        });

        this.httpClient.get<any>(url, { headers, params }).pipe(
            takeUntilDestroyed(this.destroyRef)
        ).subscribe({
            next: (response) => {
                console.log('classes from subscribe (service) = ', response);
                this._classesState.set({
                    data: response.classes,
                    loading: false,
                    error: null
                });
            },
            error: (error) => {
                console.log('error from subscribe (service)', error);
                this._classesState.set({
                    data: null,
                    loading: false,
                    error: error.errorMessage
                });
            }
        });
    }

    findRaceById(raceId: number): PlayableRace | undefined {
        return this._racesState().data?.find(r => r.id === raceId);
    }

}
