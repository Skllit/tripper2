// src/app/admin/admin-dashboard.component.ts
import { Component } from '@angular/core';
import { Router }    from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  template: `
    <div class="admin-grid">
      <mat-card (click)="go('users')">
        <mat-card-title>User Management</mat-card-title>
        <mat-card-content>View, add, edit, or delete users.</mat-card-content>
      </mat-card>

      <mat-card (click)="go('trips')">
        <mat-card-title>Trip Management</mat-card-title>
        <mat-card-content>Create/edit/delete trips (set seats here).</mat-card-content>
      </mat-card>

      <mat-card (click)="go('enrollments')">
        <mat-card-title>Enrollment Management</mat-card-title>
        <mat-card-content>Approve or reject user bookings.</mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .admin-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px,1fr));
      gap: 16px;
      padding: 16px;
    }
    mat-card { cursor: pointer; }
  `]
})
export class AdminDashboardComponent {
  constructor(private router: Router) {}

  go(path: 'users' | 'trips' | 'enrollments') {
    this.router.navigate(['/admin', path]);
  }
}
