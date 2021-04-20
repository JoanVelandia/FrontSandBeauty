import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  },
  {
    path: 'visitor',
    loadChildren: () =>
    import('./visitor/visitor.module').then((m) => m.VisitorModule),
  },
  {
    path: 'admin/:admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'client/:client',
    loadChildren: () =>
      import('./client/client.module').then((m) => m.ClientModule),
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
