// src/app/admin/enrollment-management.component.ts
import { Component, OnInit } from '@angular/core';
import { TripService }       from '../../services/trip.service';
import { MatTableModule }    from '@angular/material/table';
import { MatButtonModule }   from '@angular/material/button';
import { CommonModule }      from '@angular/common';

@Component({
  selector: 'app-enrollment-management',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  template: `
    <table mat-table [dataSource]="list" class="mat-elevation-z4 full-width">

      <ng-container matColumnDef="user">
        <th mat-header-cell *matHeaderCellDef>User</th>
        <td mat-cell *matCellDef="let e">{{e.user.name}} ({{e.customerEmail}})</td>
      </ng-container>

      <ng-container matColumnDef="trip">
        <th mat-header-cell *matHeaderCellDef>Trip</th>
        <td mat-cell *matCellDef="let e">{{e.trip.title}} ({{e.trip.date | date:'shortDate'}})</td>
      </ng-container>

      <ng-container matColumnDef="seats">
        <th mat-header-cell *matHeaderCellDef>Seats</th>
        <td mat-cell *matCellDef="let e">{{e.seats}}</td>
      </ng-container>

      <ng-container matColumnDef="status">
        <th mat-header-cell *matHeaderCellDef>Status</th>
        <td mat-cell *matCellDef="let e">{{e.status}}</td>
      </ng-container>

      <ng-container matColumnDef="charge">
        <th mat-header-cell *matHeaderCellDef>Cancel Charge</th>
        <td mat-cell *matCellDef="let e">{{e.cancellationCharge | currency}}</td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Actions</th>
        <td mat-cell *matCellDef="let e">
          <button mat-button color="primary" (click)="approve(e._id)" [disabled]="e.status!=='Pending'">Approve</button>
          <button mat-button color="warn" (click)="reject(e._id)"  [disabled]="e.status!=='Pending'">Reject</button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="cols"></tr>
      <tr mat-row        *matRowDef="let r; columns: cols;"></tr>
    </table>
  `,
  styles:[`.full-width{width:100%;}`]
})
export class EnrollmentManagementComponent implements OnInit {
  list: any[] = [];
  cols = ['user','trip','seats','status','charge','actions'];

  constructor(private svc: TripService) {}

  ngOnInit() { this.load(); }

  load() { this.svc.getAllEnrollments().subscribe(x => this.list = x); }

  approve(id:string) { this.svc.updateEnrollmentStatus(id,'Approved').subscribe(_=>this.load()); }
  reject(id:string)  { this.svc.updateEnrollmentStatus(id,'Rejected').subscribe(_=>this.load()); }
}
