import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoints } from '../common/constants/endpoints';

@Injectable({
  providedIn: 'root'
})
export class GenericServiceService<T> {

  constructor(protected httpClient: HttpClient,
              @Inject('url') protected url: string,
              @Inject('param') protected param?:string) { }

  getItems():Observable<any>{
    return this.httpClient.get<any[]>(this.url.concat(Endpoints.ALL));
  }

  saveItem(data:T){
    if(localStorage.getItem('movies') != null) {
      const movies = JSON.parse(localStorage.getItem('movies') ?? '');
      movies.push(data);
      localStorage.setItem('movies', JSON.stringify(movies));
      return movies;
    }
  }
}
