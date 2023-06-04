import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesComponent } from './movies.component';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { HttpClientModule } from '@angular/common/http';
import { MoviesModule } from './movies.module';
import { of } from 'rxjs';
import { IMovies } from '../../common/interfaces/movie';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesComponent ],
      providers:[MoviesService],
      imports:[HttpClientModule,MoviesModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should fetch movies from localStorage if available', () => {
    const localStorageData: IMovies[] = [
      { name: 'Caballo De Troya', category: 'Accion', releaseYear: 1999, price: 9.99, availableInventory: 5 },
      { name: 'Matriz', category: 'Accion', releaseYear: 1999, price: 9.99, availableInventory: 5 }
    ];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(localStorageData));

    component.getMovies();

    expect(component.moviesEmit).toEqual(localStorageData);
  });

  it('should fetch movies from service and store in localStorage', () => {

    const moviesService = TestBed.inject(MoviesService);
    const moviesData = [
    { name: 'Caballo De Troya', category: 'Accion', releaseYear: 1999, price: 9.99, availableInventory: 5 },
    { name: 'Matriz', category: 'Accion', releaseYear: 1999, price: 9.99, availableInventory: 5 }];
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(moviesService, 'getItems').and.returnValue(of(moviesData));
    spyOn(localStorage, 'setItem');

    component.getMovies();

    expect(component.moviesEmit).toEqual(moviesData);
    expect(localStorage.setItem).toHaveBeenCalledWith('movies', JSON.stringify(moviesData));
  });

  it('should return movies that match the given filters', () => {

    const localStorageData = [
      { name: 'Caballo De Troya', category: 'Accion', releaseYear: 1999, price: 9.99, availableInventory: 5 },
      { name: 'Matriz', category: 'Ciencia Ficcion', releaseYear: 1999, price: 9.99, availableInventory: 5 },
      { name: 'Batman', category: 'Accion', releaseYear: 2005, price: 9.99, availableInventory: 5 }
    ];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(localStorageData));

    const result = component.getMovieByFilters('Caballo', 'Accion');

    expect(result).toEqual([
      { name: 'Caballo De Troya', category: 'Accion', releaseYear: 1999, price: 9.99, availableInventory: 5 }
    ]);
  });

  it('should return all movies if no filters are provided', () => {
    const localStorageData = [
      { name: 'Caballo De Troya', category: 'Accion', releaseYear: 1999, price: 9.99, availableInventory: 5 },
      { name: 'Matriz', category: 'Ciencia Ficcion', releaseYear: 1999, price: 9.99, availableInventory: 5 },
      { name: 'Batman', category: 'Accion', releaseYear: 2005, price: 9.99, availableInventory: 5 }
    ];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(localStorageData));

    const result = component.getMovieByFilters();

    expect(result).toEqual(localStorageData);
  });

  it('should return an empty array if no movies match the given filters', () => {
    const localStorageData = [
      { name: 'Caballo De Troya', category: 'Accion', releaseYear: 1999, price: 9.99, availableInventory: 5 },
      { name: 'Matriz', category: 'Ciencia Ficcion', releaseYear: 1999, price: 9.99, availableInventory: 5 },
      { name: 'Batman', category: 'Accion', releaseYear: 2005, price: 9.99, availableInventory: 5 }
    ];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(localStorageData));

    const result = component.getMovieByFilters('Superman', 'Accion');

    expect(result).toEqual([]);
  })
});
