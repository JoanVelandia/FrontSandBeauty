import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, PRIMARY_OUTLET, Router } from '@angular/router';
import { forkJoin, merge, Observable } from 'rxjs';
import { flatMap } from 'rxjs/internal/operators/mergeMap';
import { Order, Purchases } from 'src/app/core/models/order/order.model';
import { Product } from 'src/app/core/models/product/product.model';
import { User } from 'src/app/core/models/user/user.model';
import { OrdersService } from 'src/app/core/services/orders/orders.service';

@Component({
  selector: 'app-detailorder',
  templateUrl: './detailorder.component.html',
  styleUrls: ['./detailorder.component.scss'],
})
export class DetailorderComponent implements OnInit {
  orders: Order[] = [];
  products: Product[] = [];
  productsOrder: Purchases[] = [];
  currentOrderId!: string;
  mineId: number[] = [];

  loadedCharacter: {} | undefined;
  arran: Observable<Product>[] = [];
  help!: Observable<User>;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private ordersService: OrdersService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    //this.getMineProducts();
  }

  loadOrders(): void {
    const urlTree = this.router.parseUrl(this.router.url);
    const currentUser = urlTree.root.children[PRIMARY_OUTLET].segments[1].path;

    this.ordersService.getCurrentUser(currentUser).subscribe((user: User) => {
      this.currentOrderId =
        urlTree.root.children[PRIMARY_OUTLET].segments[3].path;
      user.purchases.forEach((currentPurchase) => {
        const currentPurchaseID = currentPurchase.purchaseId;
        if (currentPurchaseID.toString() === this.currentOrderId.toString()) {
          this.productsOrder = currentPurchase.products;
          this.productsOrder.forEach((element) => {
            this.mineId.push(element.productId);
          });
        }
      });
      this.getMineProducts();
    });
  }
  getMineProducts(): void {
    this.mineId.forEach((element: number) => {
      this.arran.push(this.ordersService.getProductById(element));
    });

    forkJoin(this.arran).subscribe((results) => {
      this.products = results;
    });
  }
}
