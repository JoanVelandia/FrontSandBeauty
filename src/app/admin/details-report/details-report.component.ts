import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, PRIMARY_OUTLET, Route, Router } from '@angular/router';
import { Order } from 'src/app/core/models/order/order.model';
import { OrdersService } from 'src/app/core/services/orders/orders.service';
import { User } from 'src/app/core/models/user/user.model';
import { LocalStorageService } from 'src/app/core/services/localStorage/local-storage.service';

@Component({
  selector: 'app-details-report',
  templateUrl: './details-report.component.html',
  styleUrls: ['./details-report.component.scss']
})
export class DetailsReportComponent implements OnInit {

  order!: Order;
  idCurrentOrder!: string;
  total: number = 0;

  constructor(
    private route: Router,
    private orderService: OrdersService,
    private actiRoute: ActivatedRoute,
    private localStorage: LocalStorageService,

  ) { }

  ngOnInit(): void {
    const urlTree = this.route.parseUrl(this.route.url);
    const adm = urlTree.root.children[PRIMARY_OUTLET].segments[3].path;
    this.idCurrentOrder = adm;
    this.loadProducts();
  }

  loadProducts(): void{
    this.orderService.getSale(this.idCurrentOrder).subscribe( order => {
      order=this.calculartotal(order)
      this.order = order;
    });

  }

  calculartotal(order: Order): Order{
    order.products.forEach(purchases => {
      purchases.total= purchases.price*purchases.quantity;
    });
    return order;
  }

  back(): void{
    const user: User = this.localStorage.getItem('CURRENT_USER') as User;
    const rou = '/admin/' + user.nickName + '/reports';
    this.route.navigate([rou]);
  }


}
