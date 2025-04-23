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
    <h2>Manage Enrollments</h2>
    <table mat-table [dataSource]="enrollments" class="full-width">

      <ng-container matColumnDef="user">
        <th mat-header-cell *matHeaderCellDef>User</th>
        <td mat-cell *matCellDef="let e">{{e.user.name}}</td>
      </ng-container>

      <ng-container matColumnDef="trip">
        <th mat-header-cell *matHeaderCellDef>Trip</th>
        <td mat-cell *matCellDef="let e">{{e.trip.title}}</td>
      </ng-container>

      <ng-container matColumnDef="seats">
        <th mat-header-cell *matHeaderCellDef>Seats</th>
        <td mat-cell *matCellDef="let e">{{e.seats}}</td>
      </ng-container>

      <ng-container matColumnDef="status">
        <th mat-header-cell *matHeaderCellDef>Status</th>
        <td mat-cell *matCellDef="let e">{{e.status}}</td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Actions</th>
        <td mat-cell *matCellDef="let e">
          <button mat-button (click)="approve(e._id)" [disabled]="e.status!=='Pending'">
            Approve
          </button>
          <button mat-button (click)="reject(e._id)"  [disabled]="e.status!=='Pending'">
            Reject
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="cols"></tr>
      <tr mat-row        *matRowDef="let r; columns: cols;"></tr>
    </table>
  `,
  styles: [`.full-width{width:100%;}`]
})
export class EnrollmentManagementComponent implements OnInit {
  enrollments: any[] = [];
  cols = ['user','trip','seats','status','actions'];

  constructor(private tripSvc: TripService) {}

  ngOnInit() {
    this.tripSvc.getAllEnrollments()
      .subscribe(list => this.enrollments = list);
  }

  approve(id:string) {
    this.tripSvc.updateEnrollmentStatus(id,'Approved')
      .subscribe(() => this.ngOnInit());
  }
  reject(id:string) {
    this.tripSvc.updateEnrollmentStatus(id,'Rejected')
      .subscribe(() => this.ngOnInit());
  }
}
