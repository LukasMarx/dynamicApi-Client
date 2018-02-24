import { Routes, RouterModule } from '@angular/router';
import { SchemaComponent } from './schema/schema.component';
import { ProjectComponent } from './project.component';

const routes: Routes = [
  {
    path: ':id',
    component: ProjectComponent,
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
      },
      {
        path: 'assets',
        loadChildren: './assets/assets.module#AssetsModule'
      },
      {
        path: 'authProvider',
        loadChildren:
          './authenticationProvider/authenticationProvider.module#AuthenticationProviderModule'
      },
      {
        path: 'settings',
        loadChildren: './settings/settings.module#SettingsModule'
      }
    ]
  }
];

export const ProjectRoutes = RouterModule.forChild(routes);
