import { Component, OnInit, DoCheck } from '@angular/core';
import { Order } from 'src/app/core/models/order/order.model';
import { Product } from 'src/app/core/models/product/product.model';
import { User } from 'src/app/core/models/user/user.model';
import { LocalStorageService } from 'src/app/core/services/localStorage/local-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: Product[] = [];
  amoutCarts = -1;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    let amoutCarts: number;
    if (this.localStorageService.getItem('amoutCarts') !== null) {
      let key: string;
      let carts: Product[] = [];
      amoutCarts = this.localStorageService.getItem('amoutCarts') as number;
      key = 'cart' + amoutCarts;
      carts = this.localStorageService.getItem(key) as Product[];
      this.cart = carts;
      this.amoutCarts = amoutCarts;
    } else {
      this.amoutCarts = -1;
    }
  }

  buy(products: Product[]): void {
    const buyer: User = this.localStorageService.getItem(
      'CURRENT_USER'
    ) as User;
    let amoutOrders: number;
    if (this.localStorageService.getItem('amoutOrders') !== null) {
      amoutOrders = this.localStorageService.getItem('amoutOrders') as number;
    } else {
      amoutOrders = 0;
    }
    const date = new Date().toDateString();
    const total = this.total();
    const newOrder: Order = new Order(buyer.nickName, date, this.cart, total);
    this.localStorageService.setItem('order' + amoutOrders, newOrder);
    amoutOrders = Number(amoutOrders) + Number(1);
    this.localStorageService.setItem('amoutOrders', String(amoutOrders));
    this.cancelBuy();
  }
  total(): number {
    let tot = 0;
    for (const prod of this.cart) {
      tot = Number(tot) + Number(prod.price);
    }
    return tot;
  }

  cancelBuy(): void {
    this.cart = [];
    this.localStorageService.clearCart();
    this.loadProducts();
  }
}
