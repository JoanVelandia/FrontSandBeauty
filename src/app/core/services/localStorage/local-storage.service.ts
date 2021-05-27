import { Injectable } from '@angular/core';

import { User } from '../../models/user/user.model';
import { Product } from '../../models/product/product.model';
import dataUser from './../../../files/users.json';
import { Order } from '../../models/order/order.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  lipsProducts: Product[] = [];
  faceProducts: Product[] = [];
  eyesProducts: Product[] = [];
  orders: Order[] = [];
  users: User[] = [];

  currentUser = 'CURRENT_USER';
  objectKey: any;

  constructor() {}

  setSession(currentUser: User): void {
    localStorage.setItem(
      this.currentUser,
      JSON.stringify(currentUser.nickname)
    );
    localStorage.setItem(
      'rol', JSON.stringify(currentUser.roles[0].description)
    );
  }

  getRolAdmin(): boolean {
    if(this.getItem('rol') !== null){
      if(this.getItem('rol') === 'ADMIN'){
        return true;
      }
    }
    return false;
  }

  getRolClient(): boolean {
    if(this.getItem('rol') !== null){
      if(this.getItem('rol') === 'CLIENT'){
        return true;
      }
    }
    return false;
  }

  isLogIn(): boolean {
    if (this.getItem(this.currentUser) !== null) {
      return true;
    } else {
      return false;
    }
  }

  getItem(key: string): any {
    if (localStorage.getItem(key) !== null) {
      return JSON.parse(localStorage.getItem(key) || '{}');
    } else {
      return null;
    }
  }

  getToken(key: string): any {
    if (localStorage.getItem(key) !== null) {
      return localStorage.getItem(key);
    } else {
      return null;
    }
  }

  setItem(key: string, val: any): void {
    localStorage.setItem(key, JSON.stringify(val));
  }

  clearCart(): void {
    const cartSize: number = this.getItem('amountCarts') as number;
    let key: string;
    for (let i = 0; i <= cartSize; i++) {
      key = 'cart' + String(i);
      console.log('removing: ' + key);
      localStorage.removeItem(key);
    }
    localStorage.removeItem('amountCarts');
  }

  logOut(): void {
    localStorage.clear();
  }
}
