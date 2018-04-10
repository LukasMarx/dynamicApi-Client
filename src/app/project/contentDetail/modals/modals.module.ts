import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatDialogModule,
  MatSelectModule,
  MatInputModule,
  MatGridListModule,
  MatCardModule
} from '@angular/material';
import { LangPickerComponent } from './langPicker/langPicker.component';
import { ImagePickerComponent } from './imagePicker/imagePicker.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IframePickerComponent } from './iframePicker/iframePicker.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    MatGridListModule,
    MatCardModule
  ],
  declarations: [LangPickerComponent, ImagePickerComponent,
    IframePickerComponent
],
  exports: [LangPickerComponent]
})
export class ModalModule {}
