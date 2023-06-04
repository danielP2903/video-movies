import { TestBed } from '@angular/core/testing';

import { GenericServiceService } from './generic-service.service';
import { ICategory } from '../common/interfaces/category';

xdescribe('GenericServiceService', () => {
  let service: GenericServiceService<ICategory>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
