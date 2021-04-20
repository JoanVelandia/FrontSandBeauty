import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/core/models/order/order.model';
import { User } from 'src/app/core/models/user/user.model';
import { LocalStorageService } from 'src/app/core/services/localStorage/local-storage.service';
import { OrdersService } from 'src/app/core/services/orders/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  user!: User;
  orders: Order[] = [];
  constructor(
    private ordersService: OrdersService,
    private localStorageService: LocalStorageService,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.user = this.localStorageService.getItem('CURRENT_USER') as User;
    this.orders = this.ordersService.getOrders(this.user);
    this.loadOrders();
  }

  loadOrders(): void {
    if (this.localStorageService.getItem('amoutOrders') !== null) {
      let key: string;
      let currentOrder: Order;
      const sized: number = this.localStorageService.getItem(
        'amoutOrders'
      ) as number;
      for (let i = 0; i < sized; i++) {
        key = 'order' + i;
        console.log(key);
        currentOrder = this.localStorageService.getItem(key) as Order;
        this.orders.push(currentOrder);
      }
    }
  }

  detailOrderNavigate(currentOrder: number): void {
    const rou = '/client/' + this.user.nickName + '/detailOrder/';
    this.route.navigate([rou + currentOrder]);
  }
}
