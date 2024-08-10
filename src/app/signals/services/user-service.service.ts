import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { SingleUserReponse, User } from '../interfaces/user-request.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  private baseUrl = 'https://reqres.in/api/users';

  constructor() { }


  getUserById(id: number): Observable<User>{
    return this.http.get<SingleUserReponse>(`${this.baseUrl}/${ id }`)
    .pipe(
      map( response => response.data)
    );
  }
}
