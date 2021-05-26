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
    private orderService: OrdersService,
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
      const cashPayment = true;
      const delivered = false;
      const purchasedProducts: Purchases[] = [];
      const quantityBought = 20;

      this.orderService
        .getLastPurchaseId()
        .subscribe((idLastPurchase: number) => {
          const purchasedProduct: Purchases = {
            productId: productBought.id,
            purchaseId: idLastPurchase,
            quantity: 20,
            price: productBought.price,
            total: productBought.price * quantityBought,
            myURLImg: productBought.imgUrl,
            nameProduct: productBought.name,
          };
          purchasedProducts.push(purchasedProduct);

          const totalPurchase = productBought.price * quantityBought;
          const newOrder: Order = new Order(
            idLastPurchase,
            uId,
            nowDate,
            cashPayment,
            delivered,
            purchasedProducts,
            totalPurchase
          );
          console.log('entre :3');
          console.log(newOrder);
          this.orderService.saveOrder(newOrder).subscribe(() => {
            alert('Producto añadido a su historial de compras');
          });
        });
    });
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
