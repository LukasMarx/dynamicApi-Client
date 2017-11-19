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
  MatDialogModule
} from '@angular/material';
import { ContentService } from '../services/content.service';
import { EditorComponent } from './editor/index';

@NgModule({
  imports: [
    CommonModule,
    ContentDetailRoutes,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatTabsModule,
    MatDialogModule
  ],
  declarations: [ContentDetailComponent, EditorComponent],
  providers: [ContentService]
})
export class ContentDetailModule {}
