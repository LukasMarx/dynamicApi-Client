import { ContentComponent } from './content.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: ':name',
    component: ContentComponent
  }
];

export const ContentRoutes = RouterModule.forChild(routes);
