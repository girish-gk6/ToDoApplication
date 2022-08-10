import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { List } from './Model/List';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public gettodolist(): Observable<any[]> {
    return this.httpClient.get<any[]>("http://localhost:3000/list");
  }
  public addtodolist(objToDoList: List): Observable<any[]> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(objToDoList);
    return this.httpClient.post<any[]>("http://localhost:3000/list", body, { 'headers': headers });
  }
  public deletetodolist(id: any): Observable<any[]> {
    return this.httpClient.delete<any[]>("http://localhost:3000/list/" + id);
  }
  public updatetodolist(id: any, objToDoList: List): Observable<any[]> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(objToDoList);
    return this.httpClient.put<any[]>("http://localhost:3000/list/" + id, body, { 'headers': headers });
  }
  public getsingletodolist(id: any): Observable<List> {
    return this.httpClient.get<List>("http://localhost:3000/list/" + id);
  }
}
