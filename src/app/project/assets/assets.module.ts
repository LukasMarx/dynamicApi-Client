import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsComponent } from './assets.component';
import { AssetsRoutes } from './assets.routing';
import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatGridListModule,
  MatDialogModule,
  MatListModule
} from '@angular/material';
import { AssetUploadDialogComponent } from './assetUploadDialog/assetUploadDialog.component';

@NgModule({
  imports: [
    CommonModule,
    AssetsRoutes,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    FlexLayoutModule,
    MatGridListModule,
    MatDialogModule,
    MatListModule
  ],
  declarations: [AssetsComponent, AssetUploadDialogComponent],
  entryComponents: [AssetUploadDialogComponent]
})
export class AssetsModule {}
