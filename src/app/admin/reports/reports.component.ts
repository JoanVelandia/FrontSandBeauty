import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/core/models/order/order.model';
import { OrdersService } from 'src/app/core/services/orders/orders.service';
import { PRIMARY_OUTLET, Router } from '@angular/router';
import { User } from 'src/app/core/models/user/user.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  Orders: Order[] = [];

  constructor(private orderServices: OrdersService, private router: Router) {}

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder(): void {
    this.Orders = this.orderServices.getOrders();
  }

  navigateDetails(id: number): void {
    const urlTree = this.router.parseUrl(this.router.url);
    const adm = urlTree.root.children[PRIMARY_OUTLET].segments[1].path;
    const route = '/admin/' + adm + '/reports/' + id;
    this.router.navigate([route]);
  }
}
