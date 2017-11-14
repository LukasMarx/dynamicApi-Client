import { SecureComponent } from './secure.component';
import { Routes, RouterModule } from '@angular/router';
import { SchemaComponent } from './schema/schema.component';

const routes: Routes = [
  {
    path: '',
    component: SecureComponent,
    children: [
      {
        path: 'schema',
        loadChildren: './schema/schema.module#SchemaModule'
      },
      {
        path: 'type',
        loadChildren: './type/type.module#TypeModule'
      }
    ]
  }
];

export const SecureRoutes = RouterModule.forChild(routes);
