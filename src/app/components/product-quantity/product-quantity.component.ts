import { Products } from './../../models/products';
import { CartService } from './../../services/cart/cart.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css'],
})
export class ProductQuantityComponent implements OnInit {
  @Input('product')
  product: Products;
  quantity: number = 0;
  constructor(private cartservice: CartService) {}

  ngOnInit(): void {
    this.cartservice.cartObservable.subscribe({
      next: (cart) => {
        this.quantity = this.cartservice.getQuantity(this.product);
      },
    });
  }
  minusQuantity() {
    this.quantity--;
    this.cartservice.setQuantity(this.product, this.quantity);
  }
  plusQuantity() {
    this.quantity++;
    this.cartservice.setQuantity(this.product, this.quantity);
  }
}
