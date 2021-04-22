import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/core/models/product/product.model';
import { User } from 'src/app/core/models/user/user.model';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { LocalStorageService } from './../../core/services/localStorage/local-storage.service';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  product!: Product;
  EyesProducts: Product[] = [];
  FaceProducts: Product[] = [];
  LipsProducts: Product[] = [];

  hide: boolean = Boolean();
  currentUser!: User;
  loginForm: FormGroup = this.fb.group({
    name: [''],
    price: [''],
    desc: [''],
    img: [''],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private route2: Router,
    private productService: ProductsService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {}

  update(): void {
    let newProduct: Product;
    const name = this.loginForm.controls.name.value;
    const desc = this.loginForm.controls.desc.value;
    const price = this.loginForm.controls.price.value;

    /************************************************************************/
    const idCategory  = 1;
    const stock  = 100;
    /***********************************************************************/

    const idPrev = this.route.snapshot.paramMap.get('product') as string;
    const prevProduct: Product = this.getPrev(idPrev) as Product;
    newProduct = new Product(parseInt(idPrev, 10) , idCategory, prevProduct.imgUrl, name, price, stock, desc, "ACTIVO");

    this.currentUser = this.localStorageService.getItem('CURRENT_USER') as User;
    this.productService.change(prevProduct, newProduct);

    this.route2.navigate(['/admin/' + this.currentUser.nickName + '/eyes']);
  }
  getPrev(idPrev: string): Product {
    const productBefore: Product = this.productService.get(idPrev);
    return productBefore;
  }
}
