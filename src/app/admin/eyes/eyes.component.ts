import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product/product.model';
import { User } from 'src/app/core/models/user/user.model';
import {LocalStorageService } from './../../core/services/localStorage/local-storage.service';
import { ProductsService } from 'src/app/core/services/products/products.service';

@Component({
  selector: 'app-eyes',
  templateUrl: './eyes.component.html',
  styleUrls: ['./eyes.component.scss']
})
export class EyesComponent implements OnInit {

  eyesProducts: Product [] = [];
  eyes!: Product;
  client = false;

  constructor(
    private localStorage: LocalStorageService,
    private route: Router,
    private productService: ProductsService

    )
    { }

  ngOnInit(): void {
    this.loadProducts();
  }

  navigate(): void
  {
    const currentUser = this.localStorage.getItem('CURRENT_USER') as User;
    const route = '/admin/' + currentUser.nickName + '/add/';
    this.route.navigate([route]);
  }

  loadProducts(): void
  {
    this.productService.getEyesProducts().subscribe( eyesProducts => {
      console.log("REST API\n");
      console.log(eyesProducts);
      console.log("LocalStorage\n");
      console.log(this.localStorage.getEyesProducts());
      this.eyesProducts = eyesProducts;
    });

    if (this.localStorage.getItem('CURRENT_USER') !== null) {
      this.client = true;
    }
  }

  deleteProductEye(item: Product): void {
   // this.productService.delete(item)
  }

  update(item: Product): void
  {
    const currentUser = this.localStorage.getItem('CURRENT_USER') as User;
    const route = '/admin/' + currentUser.nickName + '/update/';
    console.log(route + item.id);
    this.route.navigate([route + item.id]);
  }

}
