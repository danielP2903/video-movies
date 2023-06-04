import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ICategory } from 'src/app/common/interfaces/category';
import { IFilter } from 'src/app/common/interfaces/filter';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit{
  @Output() changeFilter = new EventEmitter<IFilter>();
  public categories!:ICategory[];
  public categorySelected?:number;
  public nameMovie!:string;
  public filters!:IFilter;
  constructor(private readonly categoryService:CategoryService){}
  ngOnInit(): void {
  this.getCategories();
  }

  private getCategories(){
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    })
  }

  emitFilter(){
    const categorySelected = this.categories.find(category => category.id === Number(this.categorySelected));
    this.filters = {
      category: categorySelected?.name,
      name: this.nameMovie
    }
    this.changeFilter.emit(this.filters);
  }



  clearSelect(){
    this.categorySelected = undefined;
    this.filters = {
      category: undefined,
      name: this.nameMovie
    }
    this.changeFilter.emit(this.filters);

  }
}
