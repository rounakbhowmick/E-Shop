import { Products } from './../../models/products';
import { map } from 'rxjs/operators';
import { UserService } from './../user/user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getAllProductUrl = 'http://localhost/api/products';
  constructor(private http: HttpClient, private userservice: UserService) {}
  getAllProducts() {
    return this.http
      .get(this.getAllProductUrl, {
        headers: {
          authorization: this.userservice.getToken(),
        },
      })
      .pipe(
        map((result: { count: number; products: Products[] }) => {
          return result.products;
        })
      );
  }

  getProductById(id: String) {
    return this.http
      .get(`${this.getAllProductUrl}/${id}`, {
        headers: {
          authorization: this.userservice.getToken(),
        },
      })
      .pipe(
        map((result) => {
          return <Products>result;
        })
      );
  }
}
