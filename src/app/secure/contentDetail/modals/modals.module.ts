import { LangPickerComponent } from '.';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatDialogModule,
  MatSelectModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [LangPickerComponent],
  exports: [LangPickerComponent],
  entryComponents: [LangPickerComponent]
})
export class ModalModule {}
