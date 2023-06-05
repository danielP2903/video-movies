import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMovieComponent } from './modal-movie.component';
import { HttpClientModule } from '@angular/common/http';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/services/category/category.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MoviesModule } from '../movies.module';
import { Observable, of } from 'rxjs';
import { ICategory } from 'src/app/common/interfaces/category';
import { IMovies } from 'src/app/common/interfaces/movie';

describe('ModalMovieComponent', () => {
  let component: ModalMovieComponent;
  let fixture: ComponentFixture<ModalMovieComponent>;
  const service = new CategoryService();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMovieComponent ],
      imports:[HttpClientModule,MoviesModule],
      providers:[CategoryService,MoviesService,FormBuilder,NgbActiveModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Form with expected fields',() => {
    expect(component.formMovie.contains('name')).toBeTruthy();
    expect(component.formMovie.contains('category')).toBeTruthy();
    expect(component.formMovie.contains('year')).toBeTruthy();
    expect(component.formMovie.contains('price')).toBeTruthy();
    expect(component.formMovie.contains('stock')).toBeTruthy();
  })
  it('name required',()=> {
    const nameControl = component.formMovie.get('name');
    nameControl?.setValue('');
    expect(nameControl?.valid).toBeFalsy();
  })
  it('category required',()=> {
    component.categories =  [{ id: 1, name: "Crimen" },
    { id: 2, name: "Drama" },
    { id: 3, name: "Aventura" },
    { id: 4, name: "Ciencia ficción" },
    { id: 5, name: "Animación" },
    { id: 6, name: "Romance" },
    { id: 7, name: "Acción" },
    { id: 8, name: "Terror" },
    { id: 9, name: "Musical" },
    { id: 10, name: "Suspenso" },
    { id: 11, name: "Comedia" }
  ]
    const categoryControl = component.formMovie.get('category');
    categoryControl?.setValue(component.categories[0].name);
    expect(categoryControl?.valid).toBeTruthy();
    expect(component.categories.map(category => category.name)).toContain(categoryControl?.value);
  })
  it('year required',()=> {
    const yearControl = component.formMovie.get('year');
    yearControl?.setValue('');
    expect(yearControl?.valid).toBeFalsy();
  })
  it('price required',()=> {
    const priceControl = component.formMovie.get('year');
    priceControl?.setValue('');
    expect(priceControl?.valid).toBeFalsy();
  })
  it('stock required',()=> {
    const stockControl = component.formMovie.get('year');
    stockControl?.setValue('');
    expect(stockControl?.valid).toBeFalsy();
  })
  it('get Categories',() =>{

    const categories = [  { id: 2, name: "Drama" },
    { id: 3, name: "Aventura" },
    { id: 4, name: "Ciencia ficción" },
  ]
  spyOn(service,'getCategories').and.returnValue(of<ICategory[]>(categories));

    component.ngOnInit();
    expect(component.categories.length).toBeGreaterThan(0);
  })
  it('save Movie', () => {
    const formMovie = {
      controls: {
        name: { value: 'Harry Potter y el Caliz de Fuego' },
        category: { value: 2 },
        year: { value: { year: 2005 } },
        price: { value: 9.99 },
        stock: { value: 5 }
      }
    };

    component.formMovie = formMovie as unknown as FormGroup;

    let storedMovies;
    if (localStorage.getItem('movies') != null) {
      storedMovies = JSON.parse(localStorage.getItem('movies') ?? '');
    }

    const movieService = TestBed.inject(MoviesService);
    const saveItemSpy = spyOn(movieService, 'saveItem').and.returnValue(storedMovies);
    const showSuccessSpy = spyOn(component, 'showSuccess');
    const setMoviesChangeSpy = spyOn(movieService, 'setMoviesChange');
    const closeModalSpy = spyOn(component, 'closeModal');

    component.saveMovie();

    expect(saveItemSpy).toHaveBeenCalledWith({
      name: 'Harry Potter y el Caliz de Fuego',
      category: component.categorySelected?.name,
      releaseYear: 2005,
      price: 9.99,
      availableInventory: 5
    });

    expect(showSuccessSpy).toHaveBeenCalled();
    expect(setMoviesChangeSpy).toHaveBeenCalledWith(storedMovies);
    expect(closeModalSpy).toHaveBeenCalled();
  });

});
