import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaceComponent } from '../products/face/face.component';
import { EyesComponent } from '../products/eyes/eyes.component';
import { LipsComponent } from '../products/lips/lips.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { ClientComponent } from './client.component';
import { DetailorderComponent } from './detailOrder/detailorder.component';



const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: 'detailOrder/:id',
        component: DetailorderComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'eyes',
        component: EyesComponent
      },
      {
        path: 'lips',
        component: LipsComponent
      },
      {
        path: 'home',
        redirectTo: ''
      },
      {
        path: 'face',
        component: FaceComponent
      },
      {
        path: 'cart',
        component: CartComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
