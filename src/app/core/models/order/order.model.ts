interface Purchases {
  productId: number;
  quantity: number;
  price: number;
  total: number;
}

export class Order {
  constructor(
    public purchaseId: number,
    public clientId: number,
    public date: string,
    public cash: boolean,
    public delivered: boolean,
    public products: Purchases[]
  ) {}
}
