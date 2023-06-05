import { TestBed } from '@angular/core/testing';

import { MoviesService } from './movies.service';
import { IMovies } from 'src/app/common/interfaces/movie';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MoviesService', () => {
  let service: MoviesService;
  let http:HttpClient
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [MoviesService],
    });
    service = TestBed.inject(MoviesService);
    http = TestBed.inject(HttpClient)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Should save movie if local storage is not empty and movie is not duplicated', () => {
  const   service = TestBed.inject(MoviesService);

    const data: IMovies = {
      name: 'Harry Potter y el Caliz de Fuego',
      category: 'Fantasy',
      releaseYear: 2005,
      price: 9.99,
      availableInventory: 5
    };

    const storedMovies: IMovies[] = [
      {
        name: 'Harry Potter y la Piedra Filosofal',
        category: 'Fantasy',
        releaseYear: 2001,
        price: 9.99,
        availableInventory: 10
      },
      {
        name: 'Harry Potter y el Prisionero de Azkaban',
        category: 'Fantasy',
        releaseYear: 2004,
        price: 9.99,
        availableInventory: 8
      }
    ];

    const localStorageGetItemSpy = spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(storedMovies));
    const localStorageSetItemSpy = spyOn(localStorage, 'setItem');

    const result = service.saveItem(data);

    expect(localStorageGetItemSpy).toHaveBeenCalledWith('movies');
    expect(localStorageSetItemSpy).toHaveBeenCalledWith('movies', JSON.stringify([...storedMovies, data]));
    expect(result).toEqual([...storedMovies, data]);
  });

  it('saveItem should return an error if movie is duplicated in local storage', () => {
    const data: IMovies = {
      name: 'Harry Potter y el Caliz de Fuego',
      category: 'Fantasy',
      releaseYear: 2005,
      price: 9.99,
      availableInventory: 5
    };

    const storedMovies: IMovies[] = [
      {
        name: 'Harry Potter y el Caliz de Fuego',
        category: 'Fantasy',
        releaseYear: 2005,
        price: 9.99,
        availableInventory: 5
      },
      {
        name: 'Harry Potter y el Prisionero de Azkaban',
        category: 'Fantasy',
        releaseYear: 2004,
        price: 9.99,
        availableInventory: 8
      }
    ];

    const localStorageGetItemSpy = spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(storedMovies));
    const localStorageSetItemSpy = spyOn(localStorage, 'setItem');

    const result = service.saveItem(data);

    expect(localStorageGetItemSpy).toHaveBeenCalledWith('movies');
    expect(localStorageSetItemSpy).not.toHaveBeenCalled();
    expect(result).toEqual({ error: 'Ha ocurrido un error, película ya existe en el inventario' });
  });

  it('saveItem should return an error if local storage is empty', () => {
    const data: IMovies = {
      name: 'Harry Potter y el Caliz de Fuego',
      category: 'Fantasy',
      releaseYear: 2005,
      price: 9.99,
      availableInventory: 5
    };

    const localStorageGetItemSpy = spyOn(localStorage, 'getItem').and.returnValue(null);
    const localStorageSetItemSpy = spyOn(localStorage, 'setItem');

    const result = service.saveItem(data);

    expect(localStorageGetItemSpy).toHaveBeenCalledWith('movies');
    expect(localStorageSetItemSpy).not.toHaveBeenCalled();
    expect(result).toEqual({ error: 'Local Storage Vacio' });
  });

});
