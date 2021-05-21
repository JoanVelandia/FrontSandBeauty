import { Order } from '../order/order.model';

export class User {
  constructor(
    public id: number,
    public nickName: string,
    public password: string,
    public address: string,
    public rol: string,
    public purchases: Order[],
    public rols: Rol[]
  ){}
}
