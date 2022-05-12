import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    return this.http.get<any>('https://mean-users-app.herokuapp.com/user/allUsers/');
  }
  editUser(data:any):Observable<any>{
    return this.http.post<any>('https://mean-users-app.herokuapp.com/user/edit',{data})
  }
  deleteUser(userId:string):Observable<any>{
    return this.http.post<any>('https://mean-users-app.herokuapp.com/user/delete',{userId})
  }

  addUser(data:any):Observable<any>{
    return this.http.post<any>('https://mean-users-app.herokuapp.com/user/addNewUser',{data})
  }
  filterByRole(role:string):Observable<any>{
    return this.http.post<any>('https://mean-users-app.herokuapp.com/user/filterByRole',{role})
  }

  inputSearch(text:string):Observable<any>{
    return this.http.post<any>('https://mean-users-app.herokuapp.com/user/inputSearch',{text})
  }
}
