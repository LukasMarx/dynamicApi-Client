import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent
  }
];

export const ProjectsRoutes = RouterModule.forChild(routes);
