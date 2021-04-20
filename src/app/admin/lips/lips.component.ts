import { templateJitUrl } from '@angular/compiler';
import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product/product.model';
import { User } from 'src/app/core/models/user/user.model';
import {LocalStorageService } from './../../core/services/localStorage/local-storage.service';


@Component({
  selector: 'app-lips',
  templateUrl: './lips.component.html',
  styleUrls: ['./lips.component.scss']
})
export class LipsComponent implements OnInit {

  LipsProducts: Product [] = [];

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
    this.LipsProducts = this.localStorage.getLipsProducts();
  }

  deleteProductLip(item: Product): void {

    this.localStorage.deleteProductLips(item);
  }

  update(item: Product): void
  {
    const currentUser = this.localStorage.getItem('CURRENT_USER') as User;
    const route = '/admin/' + currentUser.nickName + '/update/';
    console.log(route + item.id);
    this.route.navigate([route + item.id]);
  }
}
