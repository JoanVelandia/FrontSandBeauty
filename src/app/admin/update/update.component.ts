import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, PRIMARY_OUTLET, Router } from '@angular/router';
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
    cate: [''],
    stock: [''],
    imgForm: [''],
  });

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {}

  update(): void {
    const name = this.loginForm.controls.name.value;
    const price = this.loginForm.controls.price.value;
    const desc = this.loginForm.controls.desc.value;

    /************************************************************************/
    const idCategory = this.loginForm.controls.cate.value;
    const stock = this.loginForm.controls.stock.value;
    const newImg = this.loginForm.controls.imgForm.value;
    /***********************************************************************/

    const idPrev = this.activatedRoute.snapshot.paramMap.get(
      'product'
    ) as string;
    this.productService.get(idPrev).subscribe((product) => {
      const prevProduct = product;
      this.productService.delete(prevProduct).subscribe(() => {
        this.productService
          .saveProducts(
            new Product(
              -1,
              idCategory,
              newImg,
              name,
              price,
              stock,
              desc,
              'ACTIVO'
            )
          )
          .subscribe(() => {
            const urlTree = this.router.parseUrl(this.router.url);
            const adm = urlTree.root.children[PRIMARY_OUTLET].segments[1].path;

            this.router.navigate(['/admin/' + adm + '/eyes']);
          });
      });
    });
  }

  discard(): void {
    const urlTree = this.router.parseUrl(this.router.url);
    const adm =
      urlTree.root.children[PRIMARY_OUTLET].segments[1].path + '/eyes';
    this.navigate('admin/' + adm);
  }

  navigate(uri: string): void {
    const rou = '/' + uri;
    this.router.navigate([rou]);
  }
}
