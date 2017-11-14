import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeComponent } from './type.component';
import { TypeRoutes } from './type.routing';
import {
  MatIconModule,
  MatGridListModule,
  MatCardModule,
  MatDialogModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { NewFieldDialogComponent } from './newFieldDialog/newFieldDialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EditFieldDialogComponent } from './editFieldDialog/editFieldDialog.component';

@NgModule({
  imports: [
    CommonModule,
    TypeRoutes,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  declarations: [TypeComponent, NewFieldDialogComponent, EditFieldDialogComponent],
  entryComponents: [NewFieldDialogComponent, EditFieldDialogComponent]
})
export class TypeModule {}
