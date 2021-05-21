import value from '*.json';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/core/models/order/order.model';
import { Product } from 'src/app/core/models/product/product.model';
import { User } from 'src/app/core/models/user/user.model';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { LocalStorageService } from './../../core/services/localStorage/local-storage.service';

@Component({
  selector: 'app-eyes',
  templateUrl: './eyes.component.html',
  styleUrls: ['./eyes.component.scss'],
})
export class EyesComponent implements OnInit {
  eyesProducts: Product[] = [];
  carts: Product[] = [];
  client = false;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.eyesProducts = this.productService.getListEye();
  }

  generateOrder(item: Product): void {
    /*const buyer: User = this.localStorage.getItem('CURRENT_USER') as User;
    const product: Product = item;
    const products: Product[] = [];

    products.push(product);
    const date = new Date().toDateString() ;
    //const newOrder: Order = new Order(buyer.nickName, date, products, product.price );
    //this.localStorage.setItem('order' + amoutOrders, newOrder);
    amoutOrders = Number(amoutOrders) + Number(1);
    this.localStorage.setItem('amoutOrders', String(amoutOrders) );*/
  }

  addCart(product: Product): void {
    /*let amoutCarts: number;

    this.carts.push(product);
    amoutCarts = Number(amoutCarts) + Number(1);
    this.localStorage.setItem('amoutCarts', String(amoutCarts));
    this.localStorage.setItem('cart' + amoutCarts, this.carts);*/
  }
}
