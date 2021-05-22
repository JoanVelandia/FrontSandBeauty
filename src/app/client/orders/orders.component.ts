import { Component, OnInit } from '@angular/core';
import { PRIMARY_OUTLET, Router } from '@angular/router';
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
  constructor(private ordersService: OrdersService, private router: Router) {}
  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.ordersService.getSales().subscribe((sales) => {
      const urlTree = this.router.parseUrl(this.router.url);
      const cli = urlTree.root.children[PRIMARY_OUTLET].segments[1].path;
      this.ordersService.getCurrentUser(cli).subscribe((usr: User) => {
        this.orders = [];
        for (const order of sales) {
          if (usr.id === order.clientId) {
            this.orders.push(order);
          }
        }
      });
    });
  }

  detailOrderNavigate(currentOrder: number): void {
    const urlTree = this.router.parseUrl(this.router.url);
    const cli = urlTree.root.children[PRIMARY_OUTLET].segments[1].path;
    const route = '/client/' + cli + '/detailOrder/';
    this.router.navigate([route + currentOrder]);
  }
}
