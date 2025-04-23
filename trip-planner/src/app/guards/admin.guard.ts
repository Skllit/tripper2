import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (this.auth.userValue?.role !== 'admin') {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}
export const AdminGuardFn: CanActivateFn = () =>
  inject(AdminGuard).canActivate();
