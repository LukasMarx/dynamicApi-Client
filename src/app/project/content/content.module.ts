import { PipesModule } from './../pipes/pipes.module';
import { ContentService } from './../services/content.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { ContentRoutes } from './content.routing';
import {
  MatToolbarModule,
  MatIconModule,
  MatTableModule,
  MatButtonModule,
  MatInputModule
} from '@angular/material';
import { ShortenerPipe } from './shortener.pipe';
import { FormsModule } from '@angular/forms';
import { DatePipe } from './date.pipe';

@NgModule({
  imports: [
    CommonModule,
    ContentRoutes,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatTableModule,
    MatButtonModule,
    PipesModule,
    MatInputModule,
    FormsModule
  ],
  declarations: [ContentComponent, ShortenerPipe, DatePipe],
  providers: [ContentService]
})
export class ContentModule {}
