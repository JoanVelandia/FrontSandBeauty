import { Injectable } from '@angular/core';
import { Order } from '../../models/order/order.model';
import { User } from '../../models/user/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { UsersService } from 'src/app/core/services/users/users.service';
import { Product } from '../../models/product/product.model';
import { ProductsService } from '../products/products.service';
@Injectable({
  providedIn: 'root',
})
export class OrdersService {

  /*getNewOrders(): Order[] {
    this.localStorage.getNewOrders();
  } */

  ord!: Order;
  currentUser!: User;
  orders: Order[] = [];

  constructor(private request: HttpClient, private userService: UsersService, private productService: ProductsService) {}

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
    this.currentUser = this.userService.getCurrentUser();
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

  getProductById(id: number): Observable<Product> {
    return this.productService.getProductById(id);
  }

  getRealProducts(productsOrder: any[]): Observable<Product[]> {
    return this.productService.getThoseProducts(productsOrder);
  }

  /*getNewOrders(): Order[] {
    this.localStorage.getNewOrders();
  } */
}
