import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TripService } from '../../services/trip.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-trip-management',
  standalone: true,

  imports: [
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CurrencyPipe
  ],
  providers: [CurrencyPipe] ,
  templateUrl: './trip-management.component.html',
  styleUrls: ['./trip-management.component.scss']
})
export class TripManagementComponent implements OnInit {
  form!: FormGroup;
  displayedColumns = ['title', 'startPoint', 'cost', 'totalSeats', 'seatsLeft', 'actions'];
  trips: any[] = [];
  editingId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private tripSvc: TripService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title:       ['', Validators.required],
      startPoint:  ['', Validators.required],
      vehicle:     ['', Validators.required],
      totalSeats:  [1, [Validators.required, Validators.min(1)]],
      attractions: ['', Validators.required],
      cost:        [0, [Validators.required, Validators.min(0)]],
      details:     ['']
    });
    this.load();
  }

  load() {
    this.tripSvc.getAll().subscribe(t => this.trips = t);
  }

  save() {
    if (this.form.invalid) return;

    const data: any = {
      ...this.form.value,
      attractions: this.form.value.attractions.split(',').map((s: string) => s.trim())
    };

    // Initialize seatsLeft only when creating a new trip
    if (!this.editingId) {
      data.seatsLeft = data.totalSeats;
    }

    const op = this.editingId
      ? this.tripSvc.update(this.editingId, data)
      : this.tripSvc.create(data);

    op.subscribe(() => {
      this.form.reset({ totalSeats: 1, cost: 0, attractions: '' });
      this.editingId = null;
      this.load();
    });
  }

  edit(trip: any) {
    this.editingId = trip._id;
    this.form.patchValue({
      ...trip,
      attractions: trip.attractions.join(', ')
    });
  }

  delete(id: string) {
    if (!confirm('Delete this trip?')) return;
    this.tripSvc.delete(id).subscribe(() => this.load());
  }
}
