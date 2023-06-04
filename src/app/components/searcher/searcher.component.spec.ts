import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearcherComponent } from './searcher.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('SearcherComponent', () => {
  let component: SearcherComponent;
  let fixture: ComponentFixture<SearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearcherComponent ],
      imports: [HttpClientModule, FormsModule],

    })
    .compileComponents();

    fixture = TestBed.createComponent(SearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Change Filter Emit',() => {
    component.categories = [
      { id: 1, name: 'Drama' },
      { id: 2, name: 'Accion' },
    ];

    expect(Array.isArray(component.categories)).toBeTruthy();
    expect(component.categories.every(category => typeof category.id === 'number' && typeof category.name === 'string')).toBeTruthy();
    component.categorySelected = component.categories[0].id;
    component.nameMovie = 'Caballo De Troya';
    spyOn(component.changeFilter, 'emit');
    component.emitFilter();

    expect(component.filters).toEqual({
      category: 'Drama',
      name: 'Caballo De Troya',
    });
    expect(component.changeFilter.emit).toHaveBeenCalledWith({
      category: 'Drama',
      name: 'Caballo De Troya',
    });
  })

  it('Clear Select',() => {
    component.categorySelected = undefined;
    component.nameMovie = 'Caballo De Troya';
    spyOn(component.changeFilter, 'emit');

    component.clearSelect();

    expect(component.filters).toEqual({
      category:undefined,
      name: 'Caballo De Troya',
    });
    expect(component.changeFilter.emit).toHaveBeenCalledWith({
      category:undefined,
      name: 'Caballo De Troya',
    });
  })
});


