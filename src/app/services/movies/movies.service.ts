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

  saveItem(data:IMovies){
    if(localStorage.getItem('movies') != null) {
      const movies = JSON.parse(localStorage.getItem('movies') ?? '');
      const hasDuplicated = movies.find((movie:IMovies) => {
        movie.name.toLowerCase();
        data.name.toLowerCase();
        return movie.name === data.name

      })
      if(hasDuplicated){return {error:'Ha ocurrido un error, película ya existe en el inventario'}}
      movies.push(data);
      localStorage.setItem('movies', JSON.stringify(movies));
      return movies;
    }
    return {error:'Local Storage Vacio'}
  }
}
