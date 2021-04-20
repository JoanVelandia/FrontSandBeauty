import { Injectable } from '@angular/core';
import { Order } from '../../models/order/order.model';
import { User } from '../../models/user/user.model';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private localStorage: LocalStorageService) {}

  getOrders(user: User): Order[] {
    const orderUser = this.localStorage.getOrders();
    const ordersFind: Order[] = [];

    for (const order of orderUser) {
      if (user.nickName === order.buyer) {
        ordersFind.push(order);
      }
    }
    return ordersFind;
  }

  /* getNewOrders(): Order[] {
    this.localStorage.getNewOrders();
  } */
}
