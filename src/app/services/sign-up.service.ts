import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient) { }

  signUp(signUpData: SignUpData): Observable<any> {
    const url = 'https://demo-api.now.sh/users';
    return this.http.post(url, signUpData);
  }
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
