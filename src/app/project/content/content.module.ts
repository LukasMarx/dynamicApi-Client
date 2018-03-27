import { ContentService } from './../services/content.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { ContentRoutes } from './content.routing';
import { MatToolbarModule, MatIconModule, MatTableModule, MatButtonModule, MatInputModule } from '@angular/material';

import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ContentRoutes,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    FormsModule
  ],
  declarations: [ContentComponent],
  providers: [ContentService]
})
export class ContentModule {}
