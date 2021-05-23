import { Injectable } from '@angular/core';
import { Product } from '../../models/product/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  EyesProducts: Product[] = [];
  FaceProducts: Product[] = [];
  LipsProducts: Product[] = [];
  product!: Product;

  constructor(private request: HttpClient) {}

  getListEye(): Product[] {
    this.getEyesProducts().subscribe((eyesProducts) => {
      this.EyesProducts = eyesProducts;
    });
    return this.EyesProducts;
  }

  getListFace(): Product[] {
    this.getFaceProducts().subscribe((faceProducts) => {
      this.FaceProducts = faceProducts;
    });

    return this.FaceProducts;
  }

  getListLip(): Product[] {
    this.getLipsProducts().subscribe((LipsProducts) => {
      this.LipsProducts = LipsProducts;
    });

    return this.LipsProducts;
  }

  getProduct(idBefore: string): Product {
    this.get(idBefore).subscribe((pro) => {
      this.product = pro;
    });

    return this.product;
  }

  deleteProduct(item: Product): void {
    this.delete(item).subscribe((itm) => {});
  }

  saveProduct(item: Product): void {
    this.saveProducts(item).subscribe((itm) => {});
  }

  getProductById(id: number): Observable<Product> {
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

  saveProducts(item: Product): Observable<Product> {
    return this.request.post<Product>('/SandBeauty/api/products/save', item);
  }

  delete(item: Product): Observable<Product> {
    const URI = '/SandBeauty/api/products/delete/' + String(item.id);
    return this.request.delete<Product>(URI);
  }

  get(idBefore: string): Observable<Product> {
    const URI = '/SandBeauty/api/products/' + idBefore;
    return this.request.get<Product>(URI);
  }

  getThoseProducts(productsOrder: any[]): Observable<Product[]> {
    const URI = '/SandBeauty/api/products/those';
    return this.request.get<Product[]>(URI);
  }
}
