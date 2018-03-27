import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from './dynamicTable/dynamicTable.component';
import { MatTableModule, MatCheckboxModule, MatPaginatorModule } from '@angular/material';
import { ValuesPipe } from './values.pipe';
import { ShortenerPipe } from './shortener.pipe';
import { DatePipe } from './date.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, MatTableModule, MatCheckboxModule, RouterModule, MatPaginatorModule],
  declarations: [DynamicTableComponent, ValuesPipe, ShortenerPipe, DatePipe],
  exports: [DynamicTableComponent, ValuesPipe]
})
export class SharedModule {}
