import { AssetsComponent } from './assets.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AssetsComponent
  }
];

export const AssetsRoutes = RouterModule.forChild(routes);
