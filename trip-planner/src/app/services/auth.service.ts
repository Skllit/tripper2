import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user$      = new BehaviorSubject<any>(null);
  public  user$       = this._user$.asObservable();

  private _loggedIn = new BehaviorSubject<boolean>(false);
  public  isLoggedIn$ = this._loggedIn.asObservable();

  constructor(private http: HttpClient) {
    const u = localStorage.getItem('user');
    if (u && u!=='undefined') this._user$.next(JSON.parse(u));
    this._loggedIn.next(!!localStorage.getItem('token'));
  }

  login(creds: {email:string,password:string}): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, creds).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this._user$.next(res.user);
        this._loggedIn.next(true);
      })
    );
  }

  register(data: {name:string,email:string,password:string}) {
    return this.http.post(`${environment.apiUrl}/auth/register`, data);
  }

  logout() {
    localStorage.clear();
    this._user$.next(null);
    this._loggedIn.next(false);
  }

  markLoggedOut() { this._loggedIn.next(false); }
  get userValue() { return this._user$.value; }
}
