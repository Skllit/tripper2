import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-enrolled-trips',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule
  ],
  templateUrl: './enrolled-trips.component.html',
  styleUrls: ['./enrolled-trips.component.scss']
})
export class EnrolledTripsComponent implements OnInit {
  trips: any[] = [];
  hasTrips = false;

  constructor(
    private tripSvc: TripService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.tripSvc.getEnrolled().subscribe({
      next: (t) => {
        this.trips = t;
        this.hasTrips = t.length > 0;

        // Prevent ExpressionChangedAfterItHasBeenCheckedError
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Failed to fetch enrolled trips:', err);
      }
    });
  }
}
