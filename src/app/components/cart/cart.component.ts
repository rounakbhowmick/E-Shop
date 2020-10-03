import { map } from 'rxjs/operators';
import { ProductService } from './../../services/product/product.service';
import { Products } from './../../models/products';
import { CartService } from './../../services/cart/cart.service';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

interface CartItem {
  product: Products;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart;
  total = 0;
  cartItems: CartItem[] = [];
  constructor(
    private cartservice: CartService,
    private productservice: ProductService
  ) {}

  subscribeCart() {
    let total = 0;
    this.cartservice.cartObservable.subscribe({
      next: (cart) => {
        // this.cartItems = [];
        let observables = [];
        total = 0;
        if (Object.keys(cart).length == 0) {
          this.cartItems = [];
        }
        for (let id in cart) {
          // console.log(id);
          observables.push(
            this.productservice.getProductById(id).pipe(
              map((product) => {
                total += product.price * cart[id];
                let item: CartItem = {
                  product: product,
                  quantity: cart[id],
                };
                return item;
              })
            )
          );
        }
        forkJoin(observables).subscribe({
          next: (cartItems: CartItem[]) => {
            this.total = total;
            this.cartItems = cartItems;
          },
        });
      },
    });
  }

  ngOnInit(): void {
    this.subscribeCart();
  }
}
