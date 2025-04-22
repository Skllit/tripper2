import { Component, OnInit } from '@angular/core';
import { CommonModule }    from '@angular/common';
import { MatTableModule }  from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { UserService }     from '../../services/user.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  displayed = ['name','email','role','actions'];

  constructor(private userSvc: UserService) {}

  ngOnInit() { this.load(); }

  load() {
    this.userSvc.getAll().subscribe(u => this.users = u);
  }

  delete(id: string) {
    if (!confirm('Delete this user?')) return;
    this.userSvc.delete(id).subscribe(() => this.load());
  }
}
