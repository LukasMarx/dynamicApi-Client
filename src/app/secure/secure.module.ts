import { SchemaService } from './services/schema.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecureComponent } from './secure.component';
import { SecureRoutes } from './secure.routing';
import { SchemaComponent } from './schema/schema.component';
import {
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
  MatListModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    SecureRoutes,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatListModule
  ],
  declarations: [SecureComponent],
  providers: [SchemaService]
})
export class SecureModule {}
