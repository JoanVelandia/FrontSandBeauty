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

  getUsers(): User[] {
    if (this.users.length === 0) {
      this.users = dataUser as User[];
    }
    return this.users;
  }

  setSession(currentUser: User): void {
    localStorage.setItem(this.currentUser, JSON.stringify(currentUser));
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

  setItem(key: string, val: any): void {
    localStorage.setItem(key, JSON.stringify(val));
  }

  clearCart(): void {
    const cartSize: number = this.getItem('amoutCarts') as number;
    let key: string;
    for (let i = 0; i <= cartSize; i++) {
      key = 'cart' + String(i);
      console.log('removiendo: ' + key);
      localStorage.removeItem(key);
    }
    localStorage.removeItem('amoutCarts');
  }

  logOut(): void {
    localStorage.clear();
  }

}
