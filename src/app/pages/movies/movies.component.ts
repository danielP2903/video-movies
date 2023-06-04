import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IMovies } from 'src/app/common/interfaces/movie';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { ModalMovieComponent } from './modal-movie/modal-movie.component';
import { Subscription } from 'rxjs';
import { IFilter } from 'src/app/common/interfaces/filter';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  public moviesEmit!: IMovies[];
  private $moviesChange?:Subscription;
  public filter!:IFilter;

  constructor(private moviesService: MoviesService,
              private modalService: NgbModal){}
  ngOnInit(): void {
    this.getMovies();
    this.$moviesChange = this.moviesService.getMoviesChange().subscribe(data => this.moviesEmit = data);
    console.log(this.filter);

  }


  public getMovies(){

    if(localStorage.getItem('movies') != null) {
      this.moviesEmit = JSON.parse(localStorage.getItem('movies') ?? '');
      return;
    }
    this.moviesService.getItems().subscribe(data => {
      this.moviesEmit = data;
      localStorage.setItem('movies', JSON.stringify(this.moviesEmit));

    })
  }

  public getFilter(filter:IFilter){

    if(!filter.category && !filter.name){
      this.moviesEmit = JSON.parse(localStorage.getItem('movies') ?? '');
    }

    const {name, category} = filter;
    this.moviesEmit = this.getMovieByFilters(name, category);

  }

  public getMovieByFilters(name?:string,category?:string){
    const movies = JSON.parse(localStorage.getItem('movies') ?? '')
    return movies.filter((movie:IMovies) => {
      const categoryMatch = !category || (movie.category?.toLowerCase().includes(category.toLowerCase()));
      const nameMatch = !name || (movie?.name.toLowerCase().includes(name.toLowerCase()));
      return categoryMatch && nameMatch;
    });
  }

  public addMovie(){
    const modal = this.modalService.open(ModalMovieComponent,{
      backdrop:'static',
      size:'xl'
    })
  }


}
