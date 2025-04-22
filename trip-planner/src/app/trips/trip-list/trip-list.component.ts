import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { RouterModule }      from '@angular/router';
import { MatCardModule }     from '@angular/material/card';
import { MatButtonModule }   from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatGridListModule
  ],
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {
  trips: any[] = [];

  constructor(private tripSvc: TripService) {}

  ngOnInit() {
    this.tripSvc.getAll().subscribe(data => this.trips = data);
  }
}
