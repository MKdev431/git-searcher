import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RepositoryDetailsComponent } from './repository-details.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [RepositoryDetailsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RepositoryDetailsComponent,
      },
    ]),
  ],
})
export class RepositoryDetailsModule {}
