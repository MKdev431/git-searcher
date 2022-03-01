import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    loadChildren: () =>
      import('./repository-list/repository-list.module').then(
        (m) => m.RepositoryListModule
      ),
  },
  {
    path: 'details/:id',
    loadChildren: () =>
      import('./repository-details/repository-details.module').then(
        (m) => m.RepositoryDetailsModule
      ),
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
