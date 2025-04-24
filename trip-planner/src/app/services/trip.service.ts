// src/app/services/trip.service.ts
import { Injectable }      from '@angular/core';
import { HttpClient }      from '@angular/common/http';
import { Observable }      from 'rxjs';
import { environment }     from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TripService {
  private apiUrl         = `${environment.apiUrl}/trips`;
  private enrollmentsUrl = `${environment.apiUrl}/enrollments`;

  constructor(private http: HttpClient) {}

  /** Admin & public: list all trips */
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /** Public: view one trip */
  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  /** Admin: create a trip */
  create(trip: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, trip);
  }

  /** Admin: update a trip */
  update(id: string, trip: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, trip);
  }

  /** Admin: delete a trip */
  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  /** Public: enroll in a trip (creates a Pending enrollment) */
  enroll(tripId: string, seats: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${tripId}/enroll`, { seats });
  }

  /** Public: get *this user’s* enrolled trips */
  getEnrolled(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/enrolled`);
  }

  // ─── ADMIN ENROLLMENT MANAGEMENT ─────────────────────────────────────────────

  /** Admin: list *all* enrollments */
  getAllEnrollments(): Observable<any[]> {
    return this.http.get<any[]>(this.enrollmentsUrl);
  }

  /** Admin: approve/reject */
  updateEnrollmentStatus(id: string, status: string): Observable<any> {
    return this.http.put<any>(`${this.enrollmentsUrl}/${id}`, { status });
  }

  /** Admin: cancel an enrollment (you can implement cancellation‐charge logic on the back) */
  cancelEnrollment(id: string): Observable<any> {
    return this.http.post<any>(`${this.enrollmentsUrl}/${id}/cancel`, {});
  }
}
