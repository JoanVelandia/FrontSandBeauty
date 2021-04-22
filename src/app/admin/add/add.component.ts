import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/core/models/product/product.model';
import { User } from 'src/app/core/models/user/user.model';
import { ProductsService } from 'src/app/core/services/products/products.service';
import {LocalStorageService } from './../../core/services/localStorage/local-storage.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  ProductosEyes: Product[] = [];
  ProductosFace: Product[] = [];
  ProductosLips: Product[] = [];
  Product!: Product;
  public form!: FormGroup;

  hide: boolean = Boolean();

  loginForm: FormGroup = this.fb.group({

  });


  currentProduct!: Product;

  submitted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private localStorage: LocalStorageService,
    private productService: ProductsService) { }

  ngOnInit(): void {
    this.loadProducts();
    this.form = this.fb.group({
    name: [''],
    id: [''],
    price: [''],
    description: [''],
    stock: [''],
    status: [''],
    img: [''],
    categoria: ['']
    })
  }

  navigateEye(route: string): void
  {
    const rou = '/' + route;
    this.router.navigate([rou]);
  }


  loadProducts(): void {
    this.ProductosLips = this.localStorage.getLipsProducts();
    this.ProductosFace = this.localStorage.getFaceProducts();
    this.ProductosEyes = this.localStorage.getEyesProducts();
  }

  add(): void {
    this.submitted = true;
    const name  = this.form.value.name;
    const description  = this.form.value.description;
    const price  = this.form.value.price;
    const imgURL  = this.form.value.img;
    const idCategory  = this.form.value.categoria;
    const stock  = this.form.value.stock;
    const status = this.form.value.status;
    console.log("medio funciona")
    console.log(stock)

    const item = new Product(0,idCategory, imgURL,name, price, stock, description, status);
    console.log(item.id)
    this.productService.saveProducts(item).subscribe(Product => console.log(Product))

   /* let amoutProducts: number;
    if (this.localStorage.getItem('amoutProducts') !== null) {
      amoutProducts = this.localStorage.getItem('amoutProducts') as number;
    } else {
      amoutProducts = 0;
    }

    if (categ === 'EYE'){
      const newId: string = 'EYE-' + String(this.ProductosEyes.length);
      this.Product = new Product(newId, idCategory, img, name, price, stock, description, true);
      this.localStorage.setItem('new' + amoutProducts, this.Product);

    }
    if (categ === 'FACE'){
      const newId: string = 'FACE-' + String(this.ProductosEyes.length);
      this.Product = new Product(newId,idCategory, img, name, price, stock, description, true);
      this.localStorage.setItem('new' + amoutProducts, this.Product);

    }
    if (categ === 'LIP'){
      const newId: string = 'LIP-' + String(this.ProductosEyes.length);
      this.Product = new Product(newId,idCategory, img, name, price,  stock, description, true);
      this.localStorage.setItem('new' + amoutProducts, this.Product);
    }*/

  }

}
