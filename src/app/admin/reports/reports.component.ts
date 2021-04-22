import { Component, OnInit } from '@angular/core';
import {Order} from 'src/app/core/models/order/order.model';
import {LocalStorageService } from './../../core/services/localStorage/local-storage.service';
import { OrdersService } from 'src/app/core/services/orders/orders.service';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user/user.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  Orders: Order [] = [];

  constructor(
    private localStorage: LocalStorageService,
    private orderServices: OrdersService,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder(){
    this.orderServices.getSales().subscribe( orderProduct =>
      {
        console.log("REST API\n");
        console.log(orderProduct);
        console.log("LocalStorage\n");
        console.log(this.localStorage.getOrders());
        this.Orders= orderProduct;
      })
  }

  navigateDetails(id: number){
    const currentUser = this.localStorage.getItem('CURRENT_USER') as User;
    const route = '/admin/' + currentUser.nickName + '/reports/'+id;
    this.route.navigate([route])

  }
}
