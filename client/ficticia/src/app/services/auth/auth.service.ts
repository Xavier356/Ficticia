import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn = false;
  role = false;

  constructor(private http: HttpClient, private messageService: MessageService) {}
  
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  
  loginuser(username: string, password: string): Observable<any> {
    const url_api = "http://localhost:8081/api/authenticate";
    return this.http.post<User>(url_api,{ username, password },{ headers: this.headers }).pipe(map(data =>  data));
  }

  setToken(token): void {
    localStorage.setItem("accessToken", token);
  }

  getToken() {
    return localStorage.getItem("accessToken");
    let hardcodedToken = localStorage.getitem("accessToken");
    setHeaders: {
      Authorization: `Bearer ${hardcodedToken}`
    }
  }

  isLogged(){
    let accessToken = localStorage.getItem("accessToken");
    if (!accessToken){
      this.loggedIn = false;
    }
    else{
      this.loggedIn = true;
    }
    return this.loggedIn;
  }

  private log(message: string) {
    this.messageService.add(`CarrouselService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
    };
}

  logoutUser() {
    let accessToken = localStorage.getItem("accessToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
  }
}
