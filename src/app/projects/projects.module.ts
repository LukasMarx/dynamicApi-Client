import { FormsModule } from '@angular/forms';
import { ProjectsRoutes } from './projects.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatDialogModule,
  MatInputModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddProjectDialogComponent } from './addProjectDialog/addProjectDialog.component';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutes,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    FormsModule
  ],
  declarations: [ProjectsComponent, AddProjectDialogComponent],
  entryComponents: [AddProjectDialogComponent]
})
export class ProjectsModule {}
