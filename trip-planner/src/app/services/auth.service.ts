import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = `${environment.apiUrl}/auth`;
  private _user$ = new BehaviorSubject<any>(null);
  user$ = this._user$.asObservable();

  constructor(private http: HttpClient) {
    const u = localStorage.getItem('user');
    if (u && u !== 'undefined') {
      try {
        this._user$.next(JSON.parse(u));
      } catch {
        localStorage.removeItem('user');
      }
    }
  }

  login(creds: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.api}/login`, creds).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this._user$.next(res.user);
      })
    );
  }

  register(data: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.api}/register`, data);
  }

  logout(): void {
    localStorage.clear();
    this._user$.next(null);
  }

  get userValue() {
    return this._user$.value;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
