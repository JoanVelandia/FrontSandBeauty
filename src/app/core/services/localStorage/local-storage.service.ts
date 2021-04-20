import { Injectable } from '@angular/core';

import { User } from '../../models/user/user.model';
import { Product } from '../../models/product/product.model';

import dataEyes from './../../../files/eyes.json';
import dataLips from './../../../files/lips.json';
import dataFace from './../../../files/face.json';
import dataUser from './../../../files/users.json';
import dataOrders from './../../../files/orders.json';
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

  getEyesProducts(): Product[] {
    console.log('there are ' + this.eyesProducts.length + ' eyes products');
    if (this.eyesProducts.length === 0) {
      this.eyesProducts = dataEyes as Product[];
    }
    console.log('there are ' + this.eyesProducts.length + ' eyes products');
    return this.eyesProducts;
  }

  getLipsProducts(): Product[] {
    console.log('there are ' + this.lipsProducts.length + ' lips products');
    if (this.lipsProducts.length === 0) {
      this.lipsProducts = dataLips as Product[];
    }
    return this.lipsProducts;
  }

  getFaceProducts(): Product[] {
    console.log('there are ' + this.faceProducts.length + ' face products');
    if (this.faceProducts.length === 0) {
      this.faceProducts = dataFace as Product[];
    }
    return this.faceProducts;
  }

  getOrders(): Order[] {
    if (this.orders.length === 0) {
      this.orders = dataOrders as Order[];
    }
    return this.orders;
  }

  addOrder(currentOrder: Order): void {
    this.orders.push(currentOrder);
  }

  getUsers(): User[] {
    if (this.users.length === 0) {
      this.users = dataUser as User[];
    }
    return this.users;
  }

  setSesion(currentUser: User): void {
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

  getNewOrders(): void {
    const ordersSize: number = this.getItem('amoutOrders') as number;
    /* let orders: Order[]; */
    let key: string;
    let order: Order;
    for (let i = 0; i < ordersSize; i++) {
      key = 'order' + String(i);
      order = this.getItem(key) as Order;
      /* orders.push(order); */
    }
  }

  logOut(): void {
    localStorage.clear();
  }

  deleteProductEye(eyes: Product): void {
    console.log(this.eyesProducts);
    for (let i = 0; i < this.eyesProducts.length; i++) {
      if (this.eyesProducts[i] === eyes) {
        this.eyesProducts.splice(i, 1);
      }
    }
    console.log(this.eyesProducts);
  }

  deleteProductFace(face: Product): void {
    console.log(this.faceProducts);
    for (let i = 0; i < this.faceProducts.length; i++) {
      if (this.faceProducts[i] === face) {
        this.faceProducts.splice(i, 1);
      }
    }
    console.log(this.faceProducts);
  }

  deleteProductLips(lip: Product): void {
    console.log(this.lipsProducts);
    for (let i = 0; i < this.lipsProducts.length; i++) {
      if (this.lipsProducts[i] === lip) {
        this.lipsProducts.splice(i, 1);
      }
    }
    console.log(this.lipsProducts);
  }

  updateFace(prevProduct: Product, newProduct: Product): void {

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.faceProducts.length; i++)
    {
      if (this.faceProducts[i].id === prevProduct.id)
      {
        this.faceProducts.splice(i, 1, newProduct);
      }
    }
  }

  updateLips(prevProduct: Product, newProduct: Product): void {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.lipsProducts.length; i++)
    {
      if (this.lipsProducts[i].id === prevProduct.id)
      {
        this.lipsProducts.splice(i, 1, newProduct);
      }
    }
  }


  updateEye(prevProduct: Product, newProduct: Product): void {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.eyesProducts.length; i++)
    {
      if (this.eyesProducts[i].id === prevProduct.id)
      {
        this.eyesProducts.splice(i, 1, newProduct);
      }
    }
  }

}
