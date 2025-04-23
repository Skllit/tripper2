import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TripService {
  private api = `${environment.apiUrl}/trips`;
  private enrollApi = environment.apiUrl.replace('/trips', '') + '/enrollments';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
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
  getAllEnrollments(): Observable<any[]> {
    return this.http.get<any[]>(this.enrollApi);
  }
  updateEnrollmentStatus(id: string, status: 'Approved' | 'Rejected'): Observable<any> {
    return this.http.patch<any>(`${this.enrollApi}/${id}`, { status });
  }

  /** enroll with seats */
  enroll(tripId: string, seats: number): Observable<any> {
    return this.http.post<any>(`${this.api}/${tripId}/enroll`, { seats });
  }
  getEnrolled(): Observable<any[]> {
    return this.http.get<any[]>('/api/enrollments');
  }
  

  /** admin: update enrollment status */

}
