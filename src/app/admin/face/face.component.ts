import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, PRIMARY_OUTLET, Router } from '@angular/router';
import { Product } from 'src/app/core/models/product/product.model';
import { User } from 'src/app/core/models/user/user.model';
import { ProductsService } from 'src/app/core/services/products/products.service';

@Component({
  selector: 'app-face',
  templateUrl: './face.component.html',
  styleUrls: ['./face.component.scss'],
})
export class FaceComponent implements OnInit {
  FaceProducts: Product[] = [];
  client = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getFaceProducts().subscribe((data) => {
      this.FaceProducts = data;
    });
  }

  navigate(): void {
    const urlTree = this.router.parseUrl(this.router.url);
    const adm = urlTree.root.children[PRIMARY_OUTLET].segments[1].path;
    const route = '/admin/' + adm + '/add/';
    this.router.navigate([route]);
  }

  deleteProductFace(item: Product): void {
    this.productService.deleteProduct(item);
  }

  update(item: Product): void {
    /*const currentUser = this.localStorage.getItem('CURRENT_USER') as User;
    const route = '/admin/' + currentUser.nickName + '/update/';
    console.log(route + item.id);
    this.route.navigate([route + item.id]);*/
  }
}
