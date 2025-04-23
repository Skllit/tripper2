import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

import { TripService } from '../../services/trip.service';

// ✅ Razorpay declaration goes OUTSIDE the class
declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  form!: FormGroup;
  tripId!: string;
  seats!: number;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private tripSvc: TripService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(p => {
      this.tripId = p['tripId'];
      this.seats = +p['seats'] || 1;
      this.form = this.fb.group({
        cardNumber: ['', [Validators.required, Validators.minLength(16)]],
        expiry:     ['', Validators.required],
        cvv:        ['', [Validators.required, Validators.minLength(3)]]
      });
    });
  }

  payWithRazorpay() {
    this.loading = true;

    const options = {
      key: 'rzp_test_Va99OvjJU36gup', // ✅ Replace with your actual Razorpay key
      amount: this.seats * 100 * 100, // ✅ ₹100 × seats × 100 (in paise)
      currency: 'INR',
      name: 'Trip Planner',
      description: `Booking ${this.seats} seat(s)`,
      handler: (response: any) => {
        // ✅ Proceed with booking after successful payment
        this.tripSvc.enroll(this.tripId, this.seats).subscribe({
          next: () => {
            alert('Payment successful! Booking confirmed.');
            this.router.navigate(['/trips/enrolled']);
          },
          error: () => {
            alert('Payment succeeded but booking failed.');
            this.loading = false;
          }
        });
      },
      prefill: {
        name: '',
        email: '',
        contact: ''
      },
      theme: {
        color: '#1976d2'
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
    this.loading = false;
  }
}
