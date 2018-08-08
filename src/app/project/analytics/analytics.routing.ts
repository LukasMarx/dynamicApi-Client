import { Routes, RouterModule } from '@angular/router';
import { AnalyticsComponent } from './analytics.component';

const routes: Routes = [
  {
    path: '',
    component: AnalyticsComponent
  }
];

export const AnalyticsRoutes = RouterModule.forChild(routes);
