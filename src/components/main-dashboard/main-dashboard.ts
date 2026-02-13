import { Component, OnInit } from '@angular/core';
import { Race } from '../../shared/types/Race';
import { CommonModule } from '@angular/common';
import { WowApiService } from '../../app/services/wow-api-service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-main-dashboard',
  imports: [CommonModule],
  templateUrl: './main-dashboard.html',
  styleUrl: './main-dashboard.css',
})
export class MainDashboard implements OnInit {

  playableRaces$: Observable<Race[]> = of([]);
  isLoading = false;
  error = '';

  constructor(private wowApiService: WowApiService) { }

  ngOnInit(): void {
    this.loadPlayableRaces();
  }

  private loadPlayableRaces(): void {
    this.isLoading = true;

    this.playableRaces$ = this.wowApiService.getRaces();
    
    
    this.playableRaces$.subscribe({
      next: (races) => {
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error.errorMessage;
        this.isLoading = false;
        console.log('Error fetching races = ', error);
      }
    })

  }

}
