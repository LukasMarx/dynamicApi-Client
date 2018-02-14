import { Routes, RouterModule } from '@angular/router';
import { TypeComponent } from './type.component';

const routes: Routes = [
  {
    path: ':name',
    component: TypeComponent
  }
];

export const TypeRoutes = RouterModule.forChild(routes);
