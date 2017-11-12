import { SchemaService } from './services/schema.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecureComponent } from './secure.component';
import { SecureRoutes } from './secure.routing';
import { SchemaComponent } from './schema/schema.component';
import { MatGridListModule } from '@angular/material';

@NgModule({
    imports: [CommonModule, SecureRoutes],
    declarations: [SecureComponent],
    providers: [SchemaService]
})
export class SecureModule {}
