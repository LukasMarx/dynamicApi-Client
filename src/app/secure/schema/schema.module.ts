import { SchemaRoutes } from './schema.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchemaComponent } from './schema.component';
import { ApolloModule } from 'apollo-angular/ApolloModule';

import { MatGridListModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material';

import { NewTypeDialogComponent } from './newTypeDialog/newTypeDialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ApolloModule,
        MatGridListModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        SchemaRoutes
    ],
    declarations: [SchemaComponent, NewTypeDialogComponent],
    entryComponents: [NewTypeDialogComponent]
})
export class SchemaModule {}
