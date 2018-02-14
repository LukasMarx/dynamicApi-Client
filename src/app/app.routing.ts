import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'projects',
    loadChildren: './projects/projects.module#ProjectsModule'
  },
  {
    path: 'project',
    loadChildren: './project/project.module#ProjectModule'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  }
];

export const AppRoutes = RouterModule.forRoot(routes);
