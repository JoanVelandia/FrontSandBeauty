export class Product {
  constructor(
    public id: string,
    public idCategory: number,
    public imgUrl: string,
    public name: string,
    public price: number,
    public stock: number,
    public description: string,
    public status: string,
  ) {}
}
