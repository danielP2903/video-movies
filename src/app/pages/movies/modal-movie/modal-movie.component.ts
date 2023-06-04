import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { getErrorMessage } from 'src/app/common/functions/validateErrorsForm';
import { ICategory } from 'src/app/common/interfaces/category';
import { IMovies } from 'src/app/common/interfaces/movie';
import { CategoryService } from 'src/app/services/category/category.service';
import { MoviesService } from 'src/app/services/movies/movies.service';

@Component({
  selector: 'app-modal-movie',
  templateUrl: './modal-movie.component.html',
  styleUrls: ['./modal-movie.component.scss']
})
export class ModalMovieComponent implements OnInit {
  public formMovie!:FormGroup;
  public categories!:ICategory[];
  private categorySelected?:ICategory;

  constructor(private readonly movieService:MoviesService,
              private readonly categoryService:CategoryService,
              private readonly activeModal:NgbActiveModal,
              private readonly form: FormBuilder){


  }
  ngOnInit(): void {
    this.initForm();
    this.getCategories();
  }

  private initForm(){
    this.formMovie = this.form.group({
      name:['',Validators.compose([Validators.required,Validators.minLength(3)]) ],
      category:['',[Validators.required]],
      year:['',Validators.required],
      price:['',[Validators.required,Validators.pattern('^[0-9]+$')]],
      stock:['',[Validators.required,Validators.pattern('^[0-9]+$')]]
    })
  }

  public getCategories(){
    this.categoryService.getCategories().subscribe(data =>{
      this.categories = data;
    })
  }

  getMessageErrorForm(controlName: string): string {
    return getErrorMessage(controlName,this.formMovie);
    }

  isInvalidControl(nameControl: string): boolean {
    const control = this.formMovie.get(nameControl);
    if (control?.touched) {
      return true;
    }
    return false;
  }

  public saveMovie(){
    this.categorySelected = this.categories.find(category => category.id === Number(this.formMovie.controls['category'].value));

    const releaseYear = this.formMovie.controls['year'].value
    const data:IMovies = {
      name: this.formMovie.controls['name'].value,
      category: this.categorySelected?.name,
      releaseYear:releaseYear.year,
      price:this.formMovie.controls['price'].value,
      availableInventory:this.formMovie.controls['stock'].value
    }

    const movies = this.movieService.saveItem(data);
    this.movieService.setMoviesChange(movies);
    this.closeModal();
  }


  public closeModal(){
    this.activeModal.close();
  }
}
