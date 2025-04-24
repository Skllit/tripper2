import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';

import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-trip-management',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatGridListModule
  ],
  templateUrl: './trip-management.component.html',
  styleUrls: ['./trip-management.component.scss']
})
export class TripManagementComponent implements OnInit {
  form!: FormGroup;
  displayedColumns = ['date', 'title', 'startPoint', 'cost', 'totalSeats', 'seatsLeft', 'actions'];
  trips: any[] = [];
  editingId: string | null = null;

  constructor(private fb: FormBuilder, private svc: TripService) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      startPoint: ['', Validators.required],
      vehicle: ['', Validators.required],
      date: [new Date(), Validators.required],
      totalSeats: [1, [Validators.required, Validators.min(1)]],
      attractions: ['', Validators.required],
      cost: [0, [Validators.required, Validators.min(0)]],
      details: ['']
    });
    this.load();
  }

  load() {
    this.svc.getAll().subscribe(trips => {
      this.trips = trips;
    });
  }

  save() {
    if (this.form.invalid) return;
  
    const data = { ...this.form.value };
    data.attractions = data.attractions
      .split(',')
      .map((a: string) => a.trim())
      .filter((a: string) => a); // remove empty strings
  
    // 🔧 Ensure seatsLeft is set on create
    if (!this.editingId) {
      data.seatsLeft = data.totalSeats;
      console.log('Submitting trip:', data); 
      this.svc.create(data).subscribe(() => {
        this.resetForm();
        this.load();
      });
    } else {
      this.svc.update(this.editingId, data).subscribe(() => {
        this.editingId = null;
        this.resetForm();
        this.load();
      });
    }
  }
  

  edit(trip: any) {
    this.editingId = trip._id;
    this.form.patchValue({
      ...trip,
      date: new Date(trip.date),
      attractions: trip.attractions.join(', ')
    });
  }

  delete(id: string) {
    if (confirm('Delete this trip?')) {
      this.svc.delete(id).subscribe(() => this.load());
    }
  }

  resetForm() {
    this.form.reset({
      title: '',
      startPoint: '',
      vehicle: '',
      date: new Date(),
      totalSeats: 1,
      attractions: '',
      cost: 0,
      details: ''
    });
  }
  cancelEdit() {
    this.editingId = null;
    this.form.reset({
      title: '',
      startPoint: '',
      vehicle: '',
      date: new Date(),
      totalSeats: 1,
      attractions: '',
      cost: 0,
      details: ''
      
    });
  }
}
