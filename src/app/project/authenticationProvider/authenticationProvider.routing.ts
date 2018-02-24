import { Routes, RouterModule } from '@angular/router';
import { AuthenticationProviderComponent } from './authenticationProvider.component';

const routes: Routes = [
  { path: '', component: AuthenticationProviderComponent }
];

export const AuthenticationProviderRoutes = RouterModule.forChild(routes);
