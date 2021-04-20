import { Product } from '../product/product.model';

export class Order {
  constructor(
    public buyer: string,
    public date: string,
    public products: Product[],
    public total: number
  ){}
}
