import { Product } from '../product/product.model';

export class Inventory {
  constructor(
    public product: Product,
    public stock: number,
  ){}
}
