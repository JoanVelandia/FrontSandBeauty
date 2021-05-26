export interface Purchases {
  productId: number;
  purchaseId: number;
  quantity: number;
  price: number;
  myURLImg: string;
  nameProduct: string;
  total: number;

}

export class Order {
  constructor(
    public purchaseId: number,
    public clientId: number,
    public date: Date,
    public cash: boolean,
    public delivered: boolean,
    public products: Purchases[],
    public total: number
  ) {}
}
