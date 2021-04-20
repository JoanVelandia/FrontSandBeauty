import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaceComponent } from '../products/face/face.component';
import { EyesComponent } from '../products/eyes/eyes.component';
import { LipsComponent } from '../products/lips/lips.component';
import { LoginComponent } from './login/login.component';
import { VisitorComponent } from './visitor.component';
import { SingupComponent } from './singup/singup.component';

const routes: Routes = [
  {
    path: '',
    component: VisitorComponent,
    children: [
      {
        path: 'eyes',
        component: EyesComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: SingupComponent
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
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitorRoutingModule { }
