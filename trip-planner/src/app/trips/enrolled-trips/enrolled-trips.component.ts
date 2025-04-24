import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { ChangeDetectorRef } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card'; 

@Component({
  selector: 'app-enrolled-trips',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatGridListModule,
    MatListModule
  ],
  templateUrl: './enrolled-trips.component.html',
  styleUrls: ['./enrolled-trips.component.scss']
})
export class EnrolledTripsComponent implements OnInit {
  trips: any[] = [];
  hasTrips = false;

  constructor(private svc: TripService) {}

  ngOnInit() {
    this.svc.getEnrolled().subscribe(list => {
      this.trips = list;
      this.hasTrips = list.length > 0;
    });
  }

  cancel(id: string) {
    if (!confirm('Cancel and incur charge?')) return;
    this.svc.cancelEnrollment(id).subscribe(_ => this.ngOnInit());
  }
}
