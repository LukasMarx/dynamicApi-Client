import { Routes, RouterModule } from '@angular/router';
import { ContentDetailComponent } from './contentDetail.component';

const routes: Routes = [
  {
    path: ':type/:id',
    component: ContentDetailComponent
  }
];

export const ContentDetailRoutes = RouterModule.forChild(routes);
