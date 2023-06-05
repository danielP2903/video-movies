import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IMovies } from 'src/app/common/interfaces/movie';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { ModalMovieComponent } from './modal-movie/modal-movie.component';
import { Subscription } from 'rxjs';
import { IFilter } from 'src/app/common/interfaces/filter';
import { ToastService } from 'src/app/services/toast.service';
import { IMessages } from 'src/app/common/interfaces/messages';
import { MESSAGES } from 'src/app/common/constants/messages';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  public moviesEmit!: IMovies[];
  private $moviesChange?:Subscription;
  public filter!:IFilter;
  public messages!:IMessages[];
  constructor(private moviesService: MoviesService,
              public toastService: ToastService,
              private modalService: NgbModal){
                this.messages = MESSAGES;
              }
  ngOnInit(): void {
    this.getMovies();

    this.$moviesChange = this.moviesService.getMoviesChange().subscribe(data => this.moviesEmit = data);
    console.log(this.filter);

  }


  public getMovies(){

    if(localStorage.getItem('movies') != null) {
      this.showSuccess();
      this.moviesEmit = JSON.parse(localStorage.getItem('movies') ?? '');
      return;
    }
    this.moviesService.getItems().subscribe(data => {
      this.moviesEmit = data;
      this.showSuccess();
      localStorage.setItem('movies', JSON.stringify(this.moviesEmit));

    },err => {
      this.showError();
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
  showSuccess() {
    const messageSuccesfull = this.messages[0].message;
		this.toastService.show(messageSuccesfull, { classname: 'bg-success text-light', delay: 3000 });
	}
  showError() {
    const messageError = this.messages[1].message;
    console.log(messageError);

		this.toastService.show(messageError, { classname: 'bg-danger text-light', delay: 3000 });
	}



}
