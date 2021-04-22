import { Injectable } from '@angular/core';
import { Order } from '../../models/order/order.model';
import { User } from '../../models/user/user.model';
import { LocalStorageService } from '../localStorage/local-storage.service';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private localStorage: LocalStorageService,
  private request: HttpClient) {}

  getSales(): Observable<Order[]> {
      return this.request.get<Order[]>('/SandBeauty/api/sales/all');
    }

  getSale(id: string): Observable<Order>
  {
    return this.request.get<Order>('/SandBeauty/api/sales/' + id);
  }

  getOrders(user: User): Order[] {
    const orderUser = this.localStorage.getOrders();
    const ordersFind: Order[] = [];

    for (const order of orderUser) {
      //if (user.nickName === order.clientId) {
        //ordersFind.push(order);
      //}
    }
    return ordersFind;
  }

  /* getNewOrders(): Order[] {
    this.localStorage.getNewOrders();
  } */
}
