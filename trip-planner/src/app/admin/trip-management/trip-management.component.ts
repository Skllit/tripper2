import { Component, OnInit } from '@angular/core';
import { CommonModule }             from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatTableModule }           from '@angular/material/table';
import { MatButtonModule }          from '@angular/material/button';
import { MatFormFieldModule }       from '@angular/material/form-field';
import { MatInputModule }           from '@angular/material/input';
import { TripService }              from '../../services/trip.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-trip-management',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule
  ],
  templateUrl: './trip-management.component.html',
  styleUrls: ['./trip-management.component.scss']
})
export class TripManagementComponent implements OnInit {
  form!: FormGroup;
  displayed = ['title', 'startPoint', 'cost', 'actions'];
  trips: any[] = [];
  enrollments: any[] = [];
  editingId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private tripSvc: TripService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title:      ['', Validators.required],
      startPoint: ['', Validators.required],
      vehicle:    ['', Validators.required],
      attractions:['', Validators.required],
      cost:       [0, [Validators.required, Validators.min(0)]],
      details:    ['']
    });
    this.load();
    this.loadEnrollments();
  }

  load() {
    this.tripSvc.getAll().subscribe(t => this.trips = t);
  }

  loadEnrollments() {
    this.tripSvc.getEnrolled().subscribe(e => this.enrollments = e);
  }

  save() {
    if (this.form.invalid) return;
    const data = { ...this.form.value, attractions: this.form.value.attractions.split(',').map((s: string) => s.trim()) };
    const obs = this.editingId
      ? this.tripSvc.update(this.editingId, data)
      : this.tripSvc.create(data);

    obs.subscribe(() => {
      this.form.reset();
      this.editingId = null;
      this.load();
    });
  }

  edit(trip: any) {
    this.editingId = trip._id;
    this.form.patchValue({ ...trip, attractions: trip.attractions.join(', ') });
  }

  delete(id: string) {
    if (!confirm('Delete this trip?')) return;
    this.tripSvc.delete(id).subscribe(() => this.load());
  }

  approve(id: string) {
    this.tripSvc.updateEnrollmentStatus(id, 'approved').subscribe(() => this.loadEnrollments());
  }

  reject(id: string) {
    this.tripSvc.updateEnrollmentStatus(id, 'rejected').subscribe(() => this.loadEnrollments());
  }
}
