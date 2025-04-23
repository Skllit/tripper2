import { Routes } from '@angular/router';

import { AuthGuardFn }       from './guards/auth.guard';
import { AdminGuardFn }      from './guards/admin.guard';

import { LoginComponent }    from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent }from './dashboard/dashboard/dashboard.component';
import { TripListComponent } from './trips/trip-list/trip-list.component';
import { EnrolledTripsComponent } from './trips/enrolled-trips/enrolled-trips.component';
import { TripDetailComponent } from './trips/trip-detail/trip-detail.component';
import { PaymentComponent }  from './trips/payment/payment.component';
import { AdminDashboardComponent }   from './admin/admin-dashboard/admin-dashboard.component';
import { UserManagementComponent }   from './admin/user-management/user-management.component';
import { TripManagementComponent }   from './admin/trip-management/trip-management.component';
import { EnrollmentManagementComponent } from './admin/enrollments/enrollment-management.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login',    component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: '',
    canActivate: [AuthGuardFn],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'trips',
        children: [
          { path: '',         component: TripListComponent },
          { path: 'enrolled', component: EnrolledTripsComponent },
          { path: 'payment',  component: PaymentComponent }
        ]
      },
      { path: 'trip/:id', component: TripDetailComponent }
    ]
  },

  {
    path: 'admin',
    canActivate: [AuthGuardFn, AdminGuardFn],
    children: [
      { path: '',            component: AdminDashboardComponent },
      { path: 'users',       component: UserManagementComponent },
      { path: 'trips',       component: TripManagementComponent },
      { path: 'enrollments', component: EnrollmentManagementComponent }
    ]
  },

  { path: '**', redirectTo: 'login' }
];