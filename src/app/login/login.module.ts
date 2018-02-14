import { FormsModule } from '@angular/forms';
import { LoginRoutes } from './login.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MatInputModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutes,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule {}
