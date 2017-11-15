import { ContentService } from './../services/content.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { ContentRoutes } from './content.routing';
import { MatToolbarModule, MatIconModule, MatTableModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ContentRoutes,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatTableModule
  ],
  declarations: [ContentComponent],
  providers: [ContentService]
})
export class ContentModule {}
