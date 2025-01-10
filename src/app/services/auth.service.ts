import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Available application-wide
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {

    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }
}
