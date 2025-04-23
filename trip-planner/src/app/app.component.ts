import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';

import { LoadingService } from './loading.service';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatSidenavModule,
    MatProgressBarModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  loading$!: Observable<boolean>;

  constructor(
    public loading: LoadingService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.loading$ = this.loading.loading$;
  }

  ngAfterViewInit() {
    // nothing extra
  }

  logout() {
    this.auth.logout();
  }
}
