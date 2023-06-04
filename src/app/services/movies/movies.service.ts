import { Injectable } from '@angular/core';
import { GenericServiceService } from '../generic-service.service';
import { IMovies } from 'src/app/common/interfaces/movie';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService extends GenericServiceService<IMovies> {
  private readonly $moviesChange = new Subject<IMovies[]>();

  constructor(private readonly http:HttpClient) {
    super(http, environment.baseUrlApi,);
  }

  setMoviesChange(data:IMovies[]){
    this.$moviesChange.next(data);
  }

  getMoviesChange(){
    return this.$moviesChange.asObservable();
  }
}
