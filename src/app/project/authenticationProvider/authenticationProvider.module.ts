import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationProviderComponent } from './authenticationProvider.component';

import {
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
  MatListModule,
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatSelectModule,
  MatGridListModule,
  MatCardModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthenticationProviderRoutes } from './authenticationProvider.routing';
import { NewAuthProviderDialogComponent } from './newAuthProviderDialog/newAuthProviderDialog.component';
import { FormsModule } from '@angular/forms';
import { AuthenticationProviderService } from '../services/authenticationProvider.service';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatListModule,
    MatButtonModule,
    AuthenticationProviderRoutes,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule
  ],
  declarations: [
    AuthenticationProviderComponent,
    NewAuthProviderDialogComponent
  ],
  providers: [AuthenticationProviderService],
  entryComponents: [NewAuthProviderDialogComponent]
})
export class AuthenticationProviderModule {}
