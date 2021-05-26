import { Injectable } from '@angular/core';
import { Order } from '../../models/order/order.model';
import { User } from '../../models/user/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/core/services/users/users.service';
import { Product } from '../../models/product/product.model';
import { ProductsService } from '../products/products.service';
@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  ord!: Order;
  currentUser!: User;
  orders: Order[] = [];

  constructor(
    private request: HttpClient,
    private userService: UsersService,
  ) {}

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

  getOrdersOf(): Order[] {
    const ordersFind: Order[] = [];
    const myUser = this.userService.getCurrentUser();
    if (myUser !== null) {
      this.currentUser = myUser;
    }
    this.getSales().subscribe((sales) => {
      this.orders = sales;
      for (const order of this.orders) {
        if (this.currentUser.id === order.clientId) {
          ordersFind.push(order);
        }
      }
    });
    return ordersFind;
  }

  getCurrentUser(name: string): Observable<User> {
    return this.userService.getUserByName(name);
  }

  /*getProductById(id: number): Observable<Product> {
    return this.productService.getProductById(id);
  }*/

  saveOrder(newOrder: Order): Observable<Product> {
    return this.request.post<Product>(
      '/SandBeauty/api/sales/save',
      newOrder
    );
  }

  getLastPurchaseId(): Observable<number> {
    return this.request.get<number>('/SandBeauty/api/sales/last');
  }
}
