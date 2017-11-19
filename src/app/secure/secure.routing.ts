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
      },
      {
        path: 'content/overview',
        loadChildren: './content/content.module#ContentModule'
      },
      {
        path: 'content/detail',
        loadChildren: './contentDetail/contentDetail.module#ContentDetailModule'
      }
    ]
  }
];

export const SecureRoutes = RouterModule.forChild(routes);
