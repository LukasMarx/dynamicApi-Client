import { LoginComponent } from './login.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

export const LoginRoutes = RouterModule.forChild(routes);
