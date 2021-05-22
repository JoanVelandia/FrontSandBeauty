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
  totales: number[] = [];

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    this.showDetailProduct();
    //this.totales.length = this.or;
    this.totales.fill(0);
    console.log(this.totales);
  }

  showDetailProduct(): void {
    this.orders.forEach((currentOrder) => {
      const urlTree = this.router.parseUrl(this.router.url);
      const currentOrderId =
        urlTree.root.children[PRIMARY_OUTLET].segments[3].path as unknown;
      const myOrderId = currentOrderId as number;

      console.log('currentOrderId' + currentOrderId);
      if ( currentOrder.purchaseId === myOrderId)
      {
        //METER CADA PRODUCTO EN EL ARREGLO DE PRODUCTOS
      }
    });
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
}
