import { Routes, RouterModule } from '@angular/router';
import { SchemaComponent } from './schema.component';

const routes: Routes = [
    {
        path: '',
        component: SchemaComponent
    }
];

export const SchemaRoutes = RouterModule.forChild(routes);
