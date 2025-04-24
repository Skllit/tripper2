import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

import { TripService } from '../../services/trip.service';
import { RouterModule } from '@angular/router';
import { LoadingService } from '../../loading.service'; // Import LoadingService
import { tap, startWith, finalize } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatGridListModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  available: any[] = [];
  enrolled: any[] = [];

  constructor(private tripSvc: TripService, public loading: LoadingService) {}

  ngOnInit() {
    this.loading.show(); // Show loading before fetching
    this.tripSvc.getAll().pipe(
      tap(t => this.available = t),
      finalize(() => this.loading.hide()) // Hide loading after completion/error
    ).subscribe();

    this.loading.show(); // Show loading before fetching
    this.tripSvc.getEnrolled().pipe(
      tap(t => {
        console.log('Enrolled trips:', t);
        this.enrolled = t;
      }),
      finalize(() => this.loading.hide())
    ).subscribe();
  }
}