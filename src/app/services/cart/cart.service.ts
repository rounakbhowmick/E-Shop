import { Products } from './../../models/products';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = {};
  private _cartObservable: BehaviorSubject<Object>;
  constructor() {
    if (!this.isCartExists())
      localStorage.setItem('cart', JSON.stringify(this.cart));
    this.readCartDataFromLocalStorage();
    this._cartObservable = new BehaviorSubject(this.cart);
  }

  get cartObservable() {
    return this._cartObservable;
  }
  readCartDataFromLocalStorage() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
  }
  writeCartDataFromLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
  addToCart(product: Products) {
    let quantity = this.cart[product._id];
    if (quantity) this.cart[product._id] = +quantity + 1;
    else this.cart[product._id] = 1;
    this._cartObservable.next(this.cart);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    // console.log(`Cart value${Object.keys(this.cart)}Test ${quantity}`);
  }
  removeFromCart(product: Products) {}
  isCartExists() {
    if (localStorage.getItem('cart')) {
      return true;
    } else {
      return false;
    }
  }
  getQuantity(product: Products) {
    return this.cart[product._id] ? +this.cart[product._id] : 0;
  }
  setQuantity(product: Products, quantity: number) {
    if (quantity < 1) {
      delete this.cart[product._id];
    } else {
      this.cart[product._id] = quantity;
    }
    this.writeCartDataFromLocalStorage();
    this._cartObservable.next(this.cart);
  }
}
