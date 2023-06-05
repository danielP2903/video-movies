import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { ModalMovieComponent } from './modal-movie/modal-movie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearcherComponent } from 'src/app/components/searcher/searcher.component';
import { MoviesItemComponent } from './movies-item/movies-item.component';
import { MoviesComponent } from './movies.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';


@NgModule({
  declarations: [
    ModalMovieComponent,
    SearcherComponent,
    MoviesComponent,
    MoviesItemComponent,
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class MoviesModule { }
