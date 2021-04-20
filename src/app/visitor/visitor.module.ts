import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { VisitorComponent } from './visitor.component';
import { VisitorRoutingModule } from './visitor-routing.module';
import { LoginComponent } from './login/login.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { SingupComponent } from './singup/singup.component';

@NgModule({
  declarations: [
    HeaderComponent,
    VisitorComponent,
    LoginComponent,
    MenuComponent,
    FooterComponent,
    SingupComponent,
  ],
  imports: [
    CommonModule,
    VisitorRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule
  ],
})
export class VisitorModule {}
