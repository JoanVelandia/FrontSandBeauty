import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ReportsComponent } from './reports/reports.component';
import { HeaderComponent } from './header/header.component';
import { AdminComponent } from './admin.component';
import { LogoutComponent } from './logout/logout.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { EyesComponent } from './eyes/eyes.component';
import { FaceComponent } from './face/face.component';
import { LipsComponent } from './lips/lips.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { DetailsReportComponent } from './details-report/details-report.component';


@NgModule({
  declarations: [
    ReportsComponent,
    HeaderComponent,
    AdminComponent,
    LogoutComponent,
    MenuComponent,
    FooterComponent,
    EyesComponent,
    FaceComponent,
    LipsComponent,
    AddComponent,
    UpdateComponent,
    DetailsReportComponent,
    ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
  ],
})
export class AdminModule { }
