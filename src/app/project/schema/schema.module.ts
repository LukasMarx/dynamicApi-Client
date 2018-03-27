import { SchemaRoutes } from './schema.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchemaComponent } from './schema.component';
import { ApolloModule } from 'apollo-angular/ApolloModule';

import { MatGridListModule, MatToolbarModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatListModule } from '@angular/material';

import { NewTypeDialogComponent } from './newTypeDialog/newTypeDialog.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ApolloModule,
    MatGridListModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    SchemaRoutes,
    MatListModule,
    FlexLayoutModule
  ],
  declarations: [SchemaComponent, NewTypeDialogComponent],
  entryComponents: [NewTypeDialogComponent]
})
export class SchemaModule {}
