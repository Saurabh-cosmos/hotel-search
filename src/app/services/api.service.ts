import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://b2cdev.frappe.cloud/api/method/at_utils.akbar_travels_utils.commonApi.hotel.get_hotel_info';
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWU1NjBjMmU2NTk5OTAxN2FjYTI0ODMiLCJ1bmlxdWVfbmFtZSI6I';

  constructor(private http: HttpClient) {}

  getHotelInfo(searchParams: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `${this.token}`
    });

    return this.http.post<any>(this.apiUrl, searchParams, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.status === 401) {
      errorMessage = 'Unauthorized access. Please check your credentials.';
    } else if (error.status === 204) {
      errorMessage = 'No content available for the given search parameters.';
    } else {
      errorMessage = `An unexpected error occurred: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}