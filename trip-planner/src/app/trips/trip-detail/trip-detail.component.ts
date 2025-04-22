import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { ActivatedRoute }    from '@angular/router';
import { MatCardModule }     from '@angular/material/card';
import { MatButtonModule }   from '@angular/material/button';

import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit {
  trip: any;
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private tripSvc: TripService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.tripSvc.getById(this.id).subscribe({
      next: t => this.trip = t,
      error: e => console.error(e)
    });
  }

  enroll() {
    this.tripSvc.enroll(this.id).subscribe({
      next: () => alert('Enrolled successfully'),
      error: () => alert('Enrollment failed')
    });
  }
}
