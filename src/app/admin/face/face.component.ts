import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product/product.model';
import { User } from 'src/app/core/models/user/user.model';
import {LocalStorageService } from './../../core/services/localStorage/local-storage.service';
import { ProductsService } from 'src/app/core/services/products/products.service';

@Component({
  selector: 'app-face',
  templateUrl: './face.component.html',
  styleUrls: ['./face.component.scss']
})
export class FaceComponent implements OnInit {

  FaceProducts: Product [] = [];
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

  loadProducts(): void
  {
    this.productService.getFaceProducts().subscribe( faceProducts => {
      console.log("REST API\n");
      console.log(faceProducts);
      console.log("LocalStorage\n");
      console.log(this.localStorage.getFaceProducts());
      this.FaceProducts = faceProducts;
    });

    if (this.localStorage.getItem('CURRENT_USER') !== null) {
      this.client = true;
    }
  }

  navigate(): void
  {
    const currentUser = this.localStorage.getItem('CURRENT_USER') as User;
    const route = '/admin/' + currentUser.nickName + '/add/';
    this.route.navigate([route]);
  }

  deleteProductFace(item: Product): void{
    this.localStorage.deleteProductFace(item);
  }

  update(item: Product): void
  {
    const currentUser = this.localStorage.getItem('CURRENT_USER') as User;
    const route = '/admin/' + currentUser.nickName + '/update/';
    console.log(route + item.id);
    this.route.navigate([route + item.id]);
  }

}
