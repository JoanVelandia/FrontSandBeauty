import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product/product.model';
import { User } from 'src/app/core/models/user/user.model';
import {LocalStorageService } from './../../core/services/localStorage/local-storage.service';

@Component({
  selector: 'app-face',
  templateUrl: './face.component.html',
  styleUrls: ['./face.component.scss']
})
export class FaceComponent implements OnInit {

  FaceProducts: Product [] = [];

  constructor(
    private localStorage: LocalStorageService,
    private route: Router
    )
    { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void
  {
    this.FaceProducts = this.localStorage.getFaceProducts();
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
