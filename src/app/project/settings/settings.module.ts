import { SettingsRoutes } from './settings.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatTabsModule,
  MatInputModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { KeyService } from '../services/key.service';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutes,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatTabsModule,
    MatInputModule,
    FormsModule
  ],
  declarations: [SettingsComponent],
  providers: [KeyService]
})
export class SettingsModule {}
