import { Component, OnInit } from '@angular/core';
import { CommonModule }             from '@angular/common';
import { MatCardModule }            from '@angular/material/card';
import { MatButtonModule }          from '@angular/material/button';
import { MatGridListModule }        from '@angular/material/grid-list';

import { TripService } from '../../services/trip.service';
import { RouterModule } from '@angular/router';

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
  enrolled: any[]  = [];

  constructor(private tripSvc: TripService) {}

  ngOnInit() {
    this.tripSvc.getAll().subscribe(t => this.available = t);
    this.tripSvc.getEnrolled().subscribe(t => this.enrolled = t);
  }
}
