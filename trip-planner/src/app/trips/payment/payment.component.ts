import { Component } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule }  from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  form: FormGroup;
  tripId: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.tripId = this.route.snapshot.paramMap.get('tripId')!;
    this.form = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.minLength(16)]],
      expiry:     ['', Validators.required],
      cvv:        ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  pay() {
    if (this.form.invalid) return;
    alert('Payment successful for trip ' + this.tripId);
    // TODO: integrate real payment gateway
  }
}
