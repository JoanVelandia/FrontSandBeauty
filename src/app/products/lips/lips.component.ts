import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, PRIMARY_OUTLET, Router } from '@angular/router';
import { Order, Purchases } from 'src/app/core/models/order/order.model';
import { Product } from 'src/app/core/models/product/product.model';
import { User } from 'src/app/core/models/user/user.model';
import { OrdersService } from 'src/app/core/services/orders/orders.service';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { LocalStorageService } from './../../core/services/localStorage/local-storage.service';

@Component({
  selector: 'app-lips',
  templateUrl: './lips.component.html',
  styleUrls: ['./lips.component.scss'],
})
export class LipsComponent implements OnInit {
  lipsProducts: Product[] = [];
  carts: Product[] = [];
  isClient = false;

  constructor(
    private productService: ProductsService,
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getLipsProducts().subscribe((products) => {
      this.lipsProducts = products;
      this.isClient = this.productService.isLogIn();
    });
  }

  generateOrder(item: Product): void {
    const urlTree = this.router.parseUrl(this.router.url);
    const buyerName = urlTree.root.children[PRIMARY_OUTLET].segments[1].path;

    this.productService.getUserByName(buyerName).subscribe((user) => {
      const productBought = item;
      const uId = user.id;
      const nowDate = new Date();
     /*  const xs = '2021-04-10T17:30:00';
      const currentDate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDay() + 'T' +
      nowDate.getHours() + ':' + (nowDate.getMinutes()) + ':' + (nowDate.getSeconds()); */
      const cashPayment = true;
      const delivered = false;
      const purchasedProducts: Purchases[] = [];
      const purchasedProduct: Purchases = {
        productId: 2,
        purchaseId: 1,
        quantity: 2,
        price: 2,
        total: 2,
        myURLImg:
        'https://definicion.mx/wp-content/uploads/2015/01/Abstracto.jpg',
        nameProduct: 'xd',
      };
      purchasedProducts.push(purchasedProduct);
      purchasedProduct.productId = productBought.id;
      const tot = 20.2;
      const newOrder: Order = new Order(-1, uId, nowDate, cashPayment, delivered, purchasedProducts, tot);
      console.log('entre :3');
      console.log(newOrder);
      this.ordersService.saveOrder(newOrder).subscribe(() => { });
    });

    /*const products: Product[] = [];

    products.push(product);
    const date = new Date().toDateString();
    //const newOrder: Order = new Order(
    //buyer.nickName,
    //date,
    //products,
    //product.price
    //);
    //this.localStorage.setItem('order' + amoutOrders, newOrder);
    amoutOrders = Number(amoutOrders) + Number(1);
    this.localStorage.setItem('amoutOrders', String(amoutOrders));*/
  }

  addCart(product: Product): void {
    /*let amoutCarts: number;
    const buyer: User = this.localStorage.getItem('CURRENT_USER') as User;
    if (this.localStorage.getItem('amoutCarts') !== null) {
      amoutCarts = this.localStorage.getItem('amoutCarts') as number;
    } else {
      amoutCarts = -1;
    }
    this.carts.push(product);
    amoutCarts = Number(amoutCarts) + Number(1);
    this.localStorage.setItem('amoutCarts', String(amoutCarts));
    this.localStorage.setItem('cart' + amoutCarts, this.carts);*/
  }
}
