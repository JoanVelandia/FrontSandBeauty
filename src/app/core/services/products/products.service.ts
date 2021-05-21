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

  getListEye (): Product [] {
      this.getEyesProducts().subscribe( eyesProducts => {
      this.EyesProducts = eyesProducts;
    });

    return this.EyesProducts;

  }

  getListFace (): Product [] {
    this.getFaceProducts().subscribe( faceProducts => {
    this.FaceProducts = faceProducts;
  });

  return this.FaceProducts;

}

getListLip (): Product [] {
  this.getLipsProducts().subscribe( LipsProducts => {
  this.LipsProducts = LipsProducts;
});

return this.LipsProducts;

}

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


}

