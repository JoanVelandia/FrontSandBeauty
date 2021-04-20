import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports/reports.component';
import { AdminComponent } from './admin.component';
import { LipsComponent } from './lips/lips.component';
import { EyesComponent } from './eyes/eyes.component';
import { FaceComponent } from './face/face.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'face',
        component: FaceComponent
      },
      {
        path: 'lips',
        component: LipsComponent
      },
      {
        path: 'eyes',
        component: EyesComponent
      },
      {
        path: 'reports',
        component: ReportsComponent
      },
      {
        path: 'update/:product',
        component: UpdateComponent
      },
      {
        path: 'add',
        component: AddComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
