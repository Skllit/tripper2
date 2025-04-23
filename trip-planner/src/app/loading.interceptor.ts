import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from './loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(
    private loading: LoadingService,
    private snack: MatSnackBar
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loading.show();
    return next.handle(req).pipe(
      tap({
        error: err => this.snack.open(err.error?.error || 'Error', 'Close', { duration: 5000 })
      }),
      finalize(() => this.loading.hide())
    );
  }
}
