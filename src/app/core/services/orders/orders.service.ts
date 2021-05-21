import { Injectable } from '@angular/core';
import { Order } from '../../models/order/order.model';
import { User } from '../../models/user/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  ord!: Order;
  orders: Order[] = [];

  constructor(private request: HttpClient) {}

  getOrder(id: string): Order {
    this.getSale(id).subscribe((sale) => {
      this.ord = sale;
    });
    return this.ord;
  }

  getOrders(): Order[] {
    this.getSales().subscribe((sales) => {
      this.orders = sales;
    });
    return this.orders;
  }

  getSales(): Observable<Order[]> {
    return this.request.get<Order[]>('/SandBeauty/api/sales/all');
  }

  getSale(id: string): Observable<Order> {
    return this.request.get<Order>('/SandBeauty/api/sales/' + id);
  }

  getOrdersOf(user: User): Order[] {
    const ordersFind: Order[] = [];
    for (const order of this.orders) {
      if (user.id  === order.clientId) {
        ordersFind.push(order);
      }
    }
    return ordersFind;
  }

  /*getNewOrders(): Order[] {
    this.localStorage.getNewOrders();
  } */
}
