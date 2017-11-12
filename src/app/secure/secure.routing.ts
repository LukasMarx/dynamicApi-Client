import { SecureComponent } from './secure.component';
import { Routes, RouterModule } from '@angular/router';
import { SchemaComponent } from './schema/schema.component';

const routes: Routes = [
    {
        path: '',
        component: SecureComponent
    },
    {
        path: 'schema',
        loadChildren: './schema/schema.module#SchemaModule'
    }
];

export const SecureRoutes = RouterModule.forChild(routes);
