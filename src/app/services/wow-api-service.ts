import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Race } from "../../shared/types/Race";
import { BEARER_TOKEN } from "../api-creds";

@Injectable({
    providedIn: 'root'
})
export class WowApiService {
    private readonly API_BASE_URL = 'https://us.api.blizzard.com';
    private readonly NAMESPACE = 'static-classic-us';
    private readonly LOCALE = 'en_US';
    
    constructor(private httpClient: HttpClient) {}


    getRaces(): Observable<Race[]> {
        const url = `${this.API_BASE_URL}/data/wow/playable-race/index`;

        const params = new HttpParams()
            .set('namespace', this.NAMESPACE)
            .set('locale', this.LOCALE);

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${BEARER_TOKEN}`
        });

        return this.httpClient.get<any>(url, { headers, params }).pipe(
            map((response) => {
                // TODO: try without map to see what happens
                return response.races.map((race: any) => ({
                    id: race.id,
                    name: race.name
                }));
            }),
            catchError(this.handleError)
        );
    }


    private handleError(error: any): Observable<never> {
        console.log('WoW API error =', error);
        return throwError(() => new Error(error));
    }

}
