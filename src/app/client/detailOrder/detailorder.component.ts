import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, PRIMARY_OUTLET, Router } from '@angular/router';
import { Order } from 'src/app/core/models/order/order.model';
import { Product } from 'src/app/core/models/product/product.model';
import { User } from 'src/app/core/models/user/user.model';
import { LocalStorageService } from 'src/app/core/services/localStorage/local-storage.service';
import { OrdersService } from 'src/app/core/services/orders/orders.service';

@Component({
  selector: 'app-detailorder',
  templateUrl: './detailorder.component.html',
  styleUrls: ['./detailorder.component.scss'],
})
export class DetailorderComponent implements OnInit {
  orders: Order[] = [];
  productsOrder: Product[] = [];

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.showDetailProduct();
  }

  showDetailProduct(): void {}

  loadOrders(): void {}
}
