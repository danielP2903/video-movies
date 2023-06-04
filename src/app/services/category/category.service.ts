import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICategory } from 'src/app/common/interfaces/category';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  public categories:ICategory[] = [
    { id: 1, name: "Crimen" },
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

  constructor() { }

  getCategories():Observable<ICategory[]>{
    return of(this.categories)
  }

}
