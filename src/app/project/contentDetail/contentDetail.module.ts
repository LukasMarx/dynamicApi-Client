import { ModalModule } from './modals/modals.module';
import { AssetPickerComponent } from './../components/assetPicker/assetPicker.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentDetailComponent } from './contentDetail.component';
import { ContentDetailRoutes } from './contentDetail.routing';
import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatTabsModule,
  MatDialogModule,
  MatInputModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { ContentService } from '../services/content.service';
import { EditorComponent } from './editor/index';
import { FormsModule } from '@angular/forms';
import { AssetPickerDialogComponent } from '../components/assetPicker/assetPickerDialog/assetPickerDialog.component';
import { LangPickerComponent } from './modals/langPicker/langPicker.component';
import { ImagePickerComponent } from './modals/imagePicker/imagePicker.component';

@NgModule({
  imports: [
    CommonModule,
    ContentDetailRoutes,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatTabsModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ModalModule
  ],
  declarations: [
    ContentDetailComponent,
    EditorComponent,
    AssetPickerComponent,
    AssetPickerDialogComponent
  ],
  providers: [ContentService],
  entryComponents: [AssetPickerDialogComponent, LangPickerComponent, ImagePickerComponent]
})
export class ContentDetailModule {}