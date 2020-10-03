import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'src/app/models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  getURL = 'http://localhost/api/categories';
  constructor(private http: HttpClient) {}
  getAllCategories() {
    return this.http.get(this.getURL).pipe(
      map((result) => {
        return <Category[]>result['categories'];
      })
    );
  }
}
