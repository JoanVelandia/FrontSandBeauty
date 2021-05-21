import { Order } from '../order/order.model';
import { Rol } from '../rol/rol.model';

export class User {
  constructor(
    public id: number,
    public nickName: string,
    public password: string,
    public address: string,
    public purchases: Order[],
    public roles: Rol[]
  ){}
}
