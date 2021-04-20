import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { HeaderComponent } from './header/header.component';
import { ClientRoutingModule } from './client-routing.module';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { DetailorderComponent } from './detailOrder/detailorder.component';

@NgModule({
  declarations: [
    ClientComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    CartComponent,
    OrdersComponent,
    DetailorderComponent,
  ],
  imports: [ClientRoutingModule, CommonModule],
})
export class ClientModule {}
