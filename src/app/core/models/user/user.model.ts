import { Order } from '../order/order.model';
import { Rol } from '../rol/rol.model';

export class User {
  constructor(
    public id: number,
    public nickname: string,
    public password: string,
    public address: string | null,
    public purchases: Order[]/* | any[]*/,
    public roles: Rol[]
  ){}
}
