import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { ClientGuard } from './guards/client.guard';
import { VisitorGuard } from './guards/visitor.guard';
import { MatFormFieldModule } from '@angular/material/form-field';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'visitor',
    pathMatch: 'full'
  },
  {
    path: 'visitor',
    loadChildren: () =>
    import('./visitor/visitor.module').then((m) => m.VisitorModule),
    canActivate: [VisitorGuard]
  },
  {
    path: 'admin/:admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
      canActivate: [AdminGuard]
  },
  {
    path: 'client/:client',
    loadChildren: () =>
      import('./client/client.module').then((m) => m.ClientModule),
      canActivate: [ClientGuard]
  },
  {
    path: '**',
    redirectTo: 'visitor',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
