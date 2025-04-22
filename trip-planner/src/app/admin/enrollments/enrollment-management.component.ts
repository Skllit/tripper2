import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-enrollment-management',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './enrollment-management.component.html',
  styleUrls: ['./enrollment-management.component.scss']
})
export class EnrollmentManagementComponent implements OnInit {
  enrollments: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('/api/enrollments').subscribe(data => this.enrollments = data);
  }

  approve(id: string) {
    this.http.patch(`/api/enrollments/${id}`, { status: 'Approved' })
      .subscribe(() => this.ngOnInit());
  }

  reject(id: string) {
    this.http.patch(`/api/enrollments/${id}`, { status: 'Rejected' })
      .subscribe(() => this.ngOnInit());
  }
}
