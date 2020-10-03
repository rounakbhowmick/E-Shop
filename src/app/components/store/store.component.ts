import { Products } from './../../models/products';
import { ProductService } from './../../services/product/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  products: Products[] = [];
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.collectProducts();
  }
  collectProducts() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
