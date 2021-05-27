import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, PRIMARY_OUTLET, Router } from '@angular/router';
import { Product } from 'src/app/core/models/product/product.model';
import { User } from 'src/app/core/models/user/user.model';
import { ProductsService } from 'src/app/core/services/products/products.service';

@Component({
  selector: 'app-lips',
  templateUrl: './lips.component.html',
  styleUrls: ['./lips.component.scss'],
})
export class LipsComponent implements OnInit {
  LipsProducts: Product[] = [];
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
    this.productService.getLipsProducts().subscribe((products) => {
      this.LipsProducts = products;
    });
  }

  add(): void {
    const urlTree = this.router.parseUrl(this.router.url);
    const adm = urlTree.root.children[PRIMARY_OUTLET].segments[1].path;
    const route = '/admin/' + adm + '/add/';
    this.router.navigate([route]);
  }

  deleteProductLip(item: Product): void {
    this.productService.delete(item).subscribe(() => {
      this.LipsProducts.forEach((value, index) => {
        if (value.id === item.id) {
          this.LipsProducts.splice(index, 1);
          alert('Prodcuto eliminado correctamente');
        }
      });
    });
  }

  update(item: Product): void {
    const urlTree = this.router.parseUrl(this.router.url);
    const adm = urlTree.root.children[PRIMARY_OUTLET].segments[1].path;
    const route = '/admin/' + adm + '/update/';
    this.router.navigate([route + item.id]);
  }
}
