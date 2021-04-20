import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/core/models/order/order.model';
import { Product } from 'src/app/core/models/product/product.model';
import { User } from 'src/app/core/models/user/user.model';
import { LocalStorageService } from 'src/app/core/services/localStorage/local-storage.service';
import { OrdersService } from 'src/app/core/services/orders/orders.service';

@Component({
  selector: 'app-detailorder',
  templateUrl: './detailorder.component.html',
  styleUrls: ['./detailorder.component.scss']
})
export class DetailorderComponent implements OnInit {

  orders: Order[] = [];
  productsOrder: Product[] = [];

  constructor(
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this.showDetailProduct();
  }

  showDetailProduct(): void{
    const user = this.localStorageService.getItem('CURRENT_USER') as User;
    const productID = this.route.snapshot.paramMap.get('id');
    this.orders = this.ordersService.getOrders(user);
    this.loadOrders();
    console.log('readed: ' + this.orders.length + ' ordes');
    for (let i = 0; i < this.orders.length; i++) {
      if (i === Number(productID) )
      {
        this.productsOrder = this.orders[i].products;
        break;
      }
    }
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

}
