import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
    {
        path: '',
        component: AppComponent
    },
    {
        path: 'secure',
        loadChildren: './secure/secure.module#SecureModule'
    }
];

export const AppRoutes = RouterModule.forRoot(routes);
