import { CartService } from './../../services/cart/cart.service';
import { Products } from './../../models/products';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css'],
})
export class ProductCartComponent implements OnInit {
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
  addToCart() {
    console.log(this.product);
    this.cartservice.addToCart(this.product);
  }

  // minusQuantity() {
  //   this.quantity--;
  //   this.cartservice.setQuantity(this.product, this.quantity);
  // }
  // plusQuantity() {
  //   this.quantity++;
  //   this.cartservice.setQuantity(this.product, this.quantity);
  // }
}
