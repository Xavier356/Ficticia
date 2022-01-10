import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { MessageService } from '../message/message.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'http://localhost:8081/api/users';
  constructor(
    private http: HttpClient, 
    private messageService: MessageService) {}
    getUsers(): Observable<User[]> {
            return this.http.get<User[]>(this.usersUrl)
              .pipe(
                tap(_ => this.log('fetched users')),
                catchError(this.handleError<User[]>('getUsers', []))
              );
          }
  
    /**
    * Handle Http operation that failed.
    * Let the app continue.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
    
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
    
        // TODO: better job of transforming error for User consumption
        this.log(`${operation} failed: ${error.message}`);
    
        // Let the app keep running by returning an empty result.
        return of(result as T);
        };
    }
    
    getUser(id: number): Observable<User> {
        const url = `${this.usersUrl}/${id}`;
        return this.http.get<User>(url).pipe(
        tap(_ => this.log(`fetched User id=${id}`)),
        catchError(this.handleError<User>(`getUser id=${id}`))
        );
    }
    
    updateUser(id, full_name, identification, age, gender, state, add_attrs): Observable<any> {
        const formData = new FormData();
        formData.append('full_name', full_name);
        formData.append('identification', identification);
        formData.append('age', age);
        formData.append('gender', gender);
        formData.append('state', state);
        formData.append('add_attrs', add_attrs);
        console.log(formData);
        return this.http.put(this.usersUrl + "/" + id, formData, this.httpOptions).pipe(
        tap(_ => this.log(`updated User id=${id}`)),
        catchError(this.handleError<any>('updateUser'))
        );
    }

    createUser(full_name, identification, age, gender, state, add_attrs) {
      const formData = new FormData();
      formData.append('full_name', full_name);
      formData.append('identification', identification);
      formData.append('age', age);
      formData.append('gender', gender);
      formData.append('state', state);
      formData.append('add_attrs', add_attrs);
      console.log(formData);
      return this.http.post<User>(this.usersUrl, formData).pipe(
        tap(_ => this.log('new user')),
        catchError(this.handleError<User[]>('createUser', []))
      );
  }
   
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    /** Log a Userservice message with the MessageService */
    private log(message: string) {
    this.messageService.add(`Userservice: ${message}`);
  }
}
  
