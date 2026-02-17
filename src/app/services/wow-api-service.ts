import { computed, DestroyRef, inject, Injectable, Signal, signal } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map, catchError, throwError, race } from 'rxjs';
import { Race } from "../../shared/types/Race";
import { BEARER_TOKEN } from "../api-creds";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Injectable({
    providedIn: 'root'
})
export class WowApiService {
    private readonly API_BASE_URL = 'https://us.api.blizzard.com';
    private readonly NAMESPACE = 'static-classic-us';
    private readonly LOCALE = 'en_US';

    private readonly destroyRef = inject(DestroyRef);
    // Approach using signals - keep track of responses with signals

    // Writable signals: mutable by this service only
    private readonly _playableRaces = signal<Race[]>([ ]);
    private readonly _isRacesLoading = signal<boolean>(false);
    private readonly _isRacesError = signal<string | null>(null);

    // Readable signals: exposed to consumers
    readonly playableRaces = this._playableRaces.asReadonly();
    readonly isRacesLoading = this._isRacesLoading.asReadonly();
    readonly isRacesError = this._isRacesError.asReadonly(); 
    
    constructor(private httpClient: HttpClient) {}

    getPlayableRaces(): void {
        this._isRacesLoading.set(true);
        // this._isRacesError.set()
        
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
                this._playableRaces.set(response.races);
                this._isRacesLoading.set(false);
            },
            error: (error) => {
                console.log('error from subscribe (service)', error);
                this._isRacesError.set(error.message);
                this._isRacesLoading.set(false);
            }
        });
    }

    findRaceById(raceId: number): Race | undefined {
        return this._playableRaces().find(r => r.id === raceId);
    }

}
