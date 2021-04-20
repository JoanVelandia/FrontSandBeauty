import { Component, OnInit } from '@angular/core';
import {Order} from 'src/app/core/models/order/order.model';
import {LocalStorageService } from './../../core/services/localStorage/local-storage.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  Orders: Order [] = [];

  constructor(
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder(){
    this.Orders = this.localStorage.getOrders()
  }

}
