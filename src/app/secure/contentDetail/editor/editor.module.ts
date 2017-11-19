import { ModalModule } from './../modals/modals.module';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from './editor.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material';
import { MatButtonModule, MatDialogModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatDialogModule, FormsModule, ModalModule],
  declarations: [EditorComponent],
  exports: [EditorComponent]
})
export class EditorModule {}
