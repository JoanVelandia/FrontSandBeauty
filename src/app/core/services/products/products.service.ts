import { Injectable } from '@angular/core';
import { Product } from '../../models/product/product.model';
import { LocalStorageService } from '../localStorage/local-storage.service';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  EyesProducts: Product[] = [];
  FaceProducts: Product[] = [];
  LipsProducts: Product[] = [];

  constructor(
    private localStrorageService: LocalStorageService,
    private request: HttpClient,
    private route: Router,

  ) {}

  getProductById(id: number): Observable<Product>{
    const URI = '/SandBeauty/api/products/' + String(id);
    return this.request.get<Product>(URI);
  }

  getLipsProducts(): Observable<Product[]> {

    return this.request.get<Product[]>('/SandBeauty/api/products/category/3');
  }

  getFaceProducts(): Observable<Product[]> {
    return this.request.get<Product[]>('/SandBeauty/api/products/category/2');
  }
  getEyesProducts(): Observable<Product[]> {
    return this.request.get<Product[]>('/SandBeauty/api/products/category/1');
  }

  saveProducts(item: Product): Observable<Product>{

    return this.request.post<Product>('/SandBeauty/api/products/save', item);
  }

  delete(item: Product): Observable<Product> {
    const URI = '/SandBeauty/api/products/delete/' + String(item.id);
    return this.request.delete<Product>(URI);

  }


  get(idBefore: string):  Observable<Product> {
    const URI = '/SandBeauty/api/products/' + idBefore;
    return this.request.get<Product>(URI);
  }

  getLip(idBefore: string): Product {
    let produc!: Product;
    this.LipsProducts = this.localStrorageService.getLipsProducts();

    for (const elem of this.LipsProducts) {
      if (elem.id === parseInt(idBefore, 10)  ) {
        produc = elem;
        break;
      }
    }
    return produc;
  }
  getFace(idBefore: string): Product {
    let produc!: Product;

    this.FaceProducts = this.localStrorageService.getFaceProducts();
    for (const elem of this.FaceProducts) {
      if (elem.id === parseInt(idBefore, 10) ) {
        produc = elem;
        break;
      }
    }
    return produc;
  }

  getEye(idBefore: string): Product {
    let produc!: Product;
    this.EyesProducts = this.localStrorageService.getEyesProducts();
    for (const elem of this.EyesProducts) {
      if (elem.id === parseInt(idBefore, 10) ) {
        produc = elem;
        break;
      }
    }
    return produc;
  }

  change(prevProduct: Product, newProduct: Product): void {
    if (prevProduct.id === 1) {
      this.changeEye(prevProduct, newProduct);
    } else if (prevProduct.id === 3) {
      this.changeLip(prevProduct, newProduct);
    } else {
      this.changeFace(prevProduct, newProduct);
    }
  }

  changeFace(prevProduct: Product, newProduct: Product): void {
    this.localStrorageService.updateFace(prevProduct, newProduct);
  }
  changeLip(prevProduct: Product, newProduct: Product): void {
    this.localStrorageService.updateLips(prevProduct, newProduct);
  }
  changeEye(prevProduct: Product, newProduct: Product): void {
    this.localStrorageService.updateEye(prevProduct, newProduct);
  }
}

