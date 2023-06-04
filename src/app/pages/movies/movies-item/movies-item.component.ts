import { Component, Input, OnInit } from '@angular/core';
import { IMovies } from 'src/app/common/interfaces/movie';

@Component({
  selector: 'app-movies-item',
  templateUrl: './movies-item.component.html',
  styleUrls: ['./movies-item.component.scss']
})
export class MoviesItemComponent implements OnInit {
  @Input() movies!:IMovies[];
  isMobile!: boolean;

  ngOnInit(): void {
  }

  getMovieName(index: number, movie: IMovies): string {
    return movie.name;
  }

}
