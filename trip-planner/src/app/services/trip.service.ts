import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TripService {
  private api = `${environment.apiUrl}/trips`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  getEnrolled(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/enrolled`);
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  create(trip: any): Observable<any> {
    return this.http.post<any>(this.api, trip);
  }

  update(id: string, trip: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, trip);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`);
  }

  enroll(id: string): Observable<any> {
    return this.http.post<any>(`${this.api}/${id}/enroll`, {});
  }

  updateEnrollmentStatus(id: string, status: string): Observable<any> {
    const url = `${environment.apiUrl.replace('/trips', '')}/enrollments/${id}`;
    return this.http.put<any>(url, { status });
  }
}
