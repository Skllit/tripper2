import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit {
  trip: any;
  id!: string;
  form!: FormGroup;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private tripSvc: TripService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    // ← use the newly added getById(...)
    this.tripSvc.getById(this.id)
      .subscribe((t: any) => {        // ← give t an explicit any type
        this.trip = t;
        this.form = this.fb.group({
          seats: [
            1,
            [
              Validators.required,
              Validators.min(1),
              Validators.max(t.seatsLeft || 1)
            ]
          ]
        });
      });
  }

  book() {
    if (this.form.invalid) return;
    const seats = this.form.value.seats;
    window.location.href = `/trips/payment?tripId=${this.id}&seats=${seats}`;
  }
}
