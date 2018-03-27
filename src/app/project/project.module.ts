import { ProjectRoutes } from './project.routing';
import { AssetService } from './services/asset.service';
import { SchemaService } from './services/schema.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchemaComponent } from './schema/schema.component';
import { MatSidenavModule, MatIconModule, MatToolbarModule, MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProjectComponent } from './project.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule, ProjectRoutes, MatSidenavModule, MatToolbarModule, MatIconModule, FlexLayoutModule, MatListModule],
  declarations: [ProjectComponent],
  providers: [SchemaService, AssetService]
})
export class ProjectModule {}
